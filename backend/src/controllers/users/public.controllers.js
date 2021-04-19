
const db = require('../../configs/database')
const {HashPassword} = require('../index');

exports.NewsREgister = async (req, res) =>{

    const {name, email,password,CPF}  = req.body

    try {

        // Converte date for pt-BR

        var today = new Date().toLocaleDateString('pt-BR')

        let [dd, mm , yyyy] = today.split('/');

        today = yyyy + '-' + mm + '-' + dd;

        //

        let Hash = await HashPassword(password)

        await db.query(`INSERT INTO users(name , email , password , CPF , registration_date)
        values( $1 , $2 , $3 , $4 , $5)`,[name,email,Hash,CPF,today])

        res.send({message:'cadastro efetuado com sucesso!'})
        
    } catch (error) {

        res.status(401).send({error:error})
        
    }
}