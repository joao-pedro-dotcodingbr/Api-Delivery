const db = require('../../configs/database')

exports.ToAddAddressUser = async (req , res) =>{

    const { city , district , street , CEP , details} = req.body;

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

    // armazenando os parâmetros para o Update

      const configQuery = {queryText:'' , params:[]}

       //#region verificando os campos que seram atualizados
       if(city){

        configQuery.queryText += 'city=$1'
        configQuery.params.push(city)

       }
       if(district){

        configQuery.queryText += ', district=$2'
        configQuery.params.push(district)

       }
       if(street){

        configQuery.queryText += ', street=$3'
        configQuery.params.push(street)

       }
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
        //caso não tenha dados adicionados
        if(configQuery.queryText == ''){
            return res.status(401).send({error:'adicione o campo com valor para ser atualizado'})
        }
        //#endregion

      const numericparams = configQuery.params.length +1;
      configQuery.params.push(id_address)

      const {rows} = await db.query(`UPDATE address_users 
                                        SET ${configQuery.queryText} 
                                        WHERE id_address=$${numericparams} RETURNING *
                                        `,
        configQuery.params)

        res.send({message:'endereço atualizado com sucesso' , date:rows[0]})
        
    } catch (error) {

        res.status(401).send({error:error})
        console.log(error)
        
    }


}

exports.ToAddPayments = async (req , res) =>{

    const {details,name} = req.body;
    const id_user = req.id_user

    try {

      // armazenando os parâmetros para o cadastro
      const configQuery = {queryText:'users_id_user , details' , valuesquery:'$1 , $2' , params:[id_user , details]}

      if(name){

          configQuery.queryText += ', name';
          configQuery.valuesquery += ', $3';
          configQuery.params.push(name)
      }
 
        const {rows} = await db.query(`INSERT INTO payments_users 
                                            (${configQuery.queryText}) 
                                          VALUES 
                                            (${configQuery.valuesquery}) 
                                          RETURNING *` , configQuery.params)

        res.send({message:'Novo tipo de pagamento adicionado', date:rows[0]})
        
    } catch (error) {

        res.status(401).send({error});
        
    }

}

exports.UpdatePaymentsUser = async (req , res) =>{

    const {details,name} = req.body;
    const id_payments = req.params.id;
    const id_user = req.id_user;

    try {

     // armazenando os parâmetros para o Update
      let configQuery = {queryText:'' , params:[]}

      //#region validações

     //verificando se á valores
      if(details){

        configQuery.queryText += 'details=$1';
        configQuery.params.push(details)
      }
      if(name){

          configQuery.queryText += ', name=$2';
          configQuery.params.push(name)
          console.log('passou')
      }
      
      if(configQuery.queryText == ''){
          return res.status(401).send({error:'adicione o campo com valor para ser atualizado'})
      }
      //

      // verificando se o id do usuário(do token) é o usuário correto
      let permission = await db.query('SELECT users_id_user FROM payments_users WHERE id_payment=$1', [id_payments])

      if(!permission.rows[0].users_id_user == id_user){
        return res.status(401).send({error:'Só o usuário poderá alterar os dados de pagamento\n se você é o usuário envie uma mensagem para a central de problemas'})
      }
      //

    //#endregion

      let numericparams = configQuery.params.length +1;
      configQuery.params.push(id_payments)
      //RETURNING *
      let {rows} = await db.query(`UPDATE payments_users SET ${configQuery.queryText} WHERE id_payment=$${numericparams} RETURNING *`, configQuery.params)
      res.send({message:'forma de pagamento atualizada' , date:rows[0]})
        
    } catch (error) {

        res.status(401).send({error})
        console.log(error)
        
    }
}