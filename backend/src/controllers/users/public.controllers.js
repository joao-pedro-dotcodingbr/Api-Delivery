const db = require('../../configs/database')
const {HashPassword , getToken} = require('../index');
const bcryptjs = require('bcryptjs')
exports.NewsREgister = async (req, res) =>{

    const {name, email,password,CPF}  = req.body

    try {

        //#region Converte date para pt-BR

        var today = new Date().toLocaleDateString('pt-BR')

        let [dd, mm , yyyy] = today.split('/');

        today = yyyy + '-' + mm + '-' + dd;

        //#endregion

        let Hash = await HashPassword(password)

        await db.query(`INSERT INTO users(name , email , password , CPF , registration_date)
        values( $1 , $2 , $3 , $4 , $5)`,[name,email,Hash,CPF,today])

        //#region TOKEN

        // selecionando o id do usuário no banco para adicionar no parametro do token
        let {rows} = await db.query('SELECT id_user FROM users WHERE email=$1' , [email])

        let token =  await getToken(rows[0].id_user , name , email) 
        // Init JSON(tokens)
        let tokens = { tokens:[{ token:token}]}
        // Adicionando o token nos dados do usuário
        await db.query(`UPDATE users SET tokens=$1 WHERE id_user=$2` , [tokens , rows[0].id_user])

        //#endregion

        res.send({message:'cadastro efetuado com sucesso' , token})

    } catch (error) {

        res.status(401).send({error:error})
        
    }
}

