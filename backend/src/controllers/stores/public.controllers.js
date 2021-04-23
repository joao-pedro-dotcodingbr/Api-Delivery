const db = require('../../configs/database')

exports.FullGetProducts = async (req, res) =>{

    try {

        let {rows} = await db.query('SELECT * FROM products')

        res.send({date:rows})

    } catch (error) {

        res.status(401).send({error:error})
        
    }
}
