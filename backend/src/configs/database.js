const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new pg.Pool({

    host:process.env.HOST_DATABASE,
    port:process.env.PORT_DATABASE,
    user:process.env.USER_DATABASE,
    password:process.env.PASSWORD_DATABASE,
    database:process.env.DATABASE


})

pool.on('connect' , () =>{
    console.log('connected database')
})

module.exports = {
    query:(text , params) => pool.query(text, params)
}