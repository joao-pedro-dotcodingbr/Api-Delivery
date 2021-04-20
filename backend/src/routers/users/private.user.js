const express = require('express')
const controllers = require('../../controllers/users/private.controllers')
const router = express.Router()
const  auth = require('../../middleware/auth.users')

router.use(auth)
// Add news address requestion = http://localhost:3000/register/user/addAddress
router.post('/addAddress' , controllers.ToAddAddressUser)

// Update requestion = http://localhost:3000/register/user/update_addAddress/:id
router.put('/update_addAddress' , controllers.UpdateAddressUser)


module.exports = app => app.use('/register/user' , router)