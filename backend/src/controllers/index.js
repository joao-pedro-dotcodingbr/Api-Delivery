const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config()

// Método para criptografar a senha do usuário e retornar a senha modificada.
exports.HashPassword = async (password) =>{

    const hash = await bcrypt.hash(password, 10)
    return hash

}

exports.getToken = async (id, name , email) =>{

    const token = await jwt.sign({id , name, email} , process.env.TOKEN_USER);

    return token

}
 