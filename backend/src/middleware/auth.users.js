const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (req , res , next) =>{

    try {

       const authHeader = req.headers.authorization

       if(!authHeader){
           return res.status(401).send({error:'Toekn não encontrado'})
       }

       const [beara , token] = authHeader.split(' ');

       if(!/^Bearer$/i.test(beara)){
           return res.status(401).send({error:'token mal formatado'})
       }

       jwt.verify(token , process.env.TOKEN_USER , (err , decoded) =>{

        if(err) return res.status(401).send({error:'Token invalido'})

        req.id_user = decoded.id;

        next()

       })

        
    } catch (error) {

        res.status(401).send({error:error , message:'Ocorreu algum erro na autorização do token'})
        
    }

}
 