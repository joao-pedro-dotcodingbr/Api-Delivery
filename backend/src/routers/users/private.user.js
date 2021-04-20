const express = require('express')
const controllers = require('../../controllers/users/private.controllers')
const router = express.Router()
const  auth = require('../../middleware/auth.users')

router.use(auth)
// SignIn requestion = http://localhost:3000/register/user/addAddress
router.post('/addAddress' , controllers.ToAddAddress)


module.exports = app => app.use('/register/user' , router)