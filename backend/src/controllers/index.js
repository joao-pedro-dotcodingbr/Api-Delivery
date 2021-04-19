const bcrypt = require('bcryptjs');


// Método para criptografar a senha do usuário e retornar a senha modificada.
exports.HashPassword = async (password) =>{

    const hash = await bcrypt.hash(password, 10)

    return hash

}
 