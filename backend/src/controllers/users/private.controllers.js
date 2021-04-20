const db = require('../../configs/database')

exports.ToAddAddressUser = async (req , res) =>{

    const {id_user, city , district , street , CEP , details} = req.body;

    try {

    // armazenando os parâmetros para o cadastro
      const configQuery = {queryText:'city , district , street' , valuesquery:'$1 , $2, $3' , params:[city , district , street]}

     //#region  verificando se o cep ou o details foi adicionado pelo usuário
        if(CEP){

            configQuery.queryText += ', CEP'
            configQuery.params.push(CEP)
            configQuery.valuesquery += ', $4'

        }
        if(details){

            configQuery.queryText += ', details'
            configQuery.params.push(details)
            
            if(configQuery.valuesquery.search('$4')){

                configQuery.valuesquery += ', $5'

            }
            else{

                configQuery.valuesquery += ', $4'

            }

        }
        //#endregion

      const {rows} = await db.query(`INSERT INTO address_users (${configQuery.queryText}) VALUES (${configQuery.valuesquery}) RETURNING *`,
        configQuery.params)

        // Adicionando o id do endereço no registro do usuário
       await db.query(`UPDATE users SET address_user=$1 WHERE id_user=$2`,
        [rows[0].id_address , req.id_user])

        res.send({message:'endereço adicionado com sucesso' , date:rows[0]})
        
    } catch (error) {

        return res.status(401).send({error:error})
        
    }
}

exports.UpdateAddressUser = async (req ,res) =>{


    const {city , district , street , CEP , details} = req.body;
    const id_address = req.params.id;

    try {

    // armazenando os parâmetros para o cadastro
      const configQuery = {queryText:'cit=$1 , district=$2 , street=$3' , params:[city , district , street]}

     //#region  verificando se o cep ou o details foi adicionado pelo usuário
        if(CEP){

            configQuery.queryText += ', CEP=$4'
            configQuery.params.push(CEP)

        }
        if(details){

            configQuery.params.push(details)
            
            if(configQuery.queryText.search('$CEP=$4')){

                configQuery.queryText += ', details=$5'

            }
            else{

                configQuery.queryText += ', details=$4'

            }

        }
        //#endregion

     const numParams = configQuery.params.length;

      const {rows} = await db.query(`UPDATE address_users SET ${configQuery.queryText} WHERE id_address=${id_address} RETURNING *`,
        configQuery.params)

        res.send({message:'endereço adicionado com sucesso' , date:rows[0]})
        
    } catch (error) {

        return res.status(401).send({error:error})
        
    }


}