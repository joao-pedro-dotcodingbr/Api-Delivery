const express = require('express')
const controllers = require('../../controllers/users/private.controllers')
const router = express.Router()
const  auth = require('../../middleware/auth.users')

router.use(auth)
// Add news address requestion = http://localhost:3000/register/user/add_address
router.post('/add_address' , controllers.ToAddAddressUser)

// Update requestion = http://localhost:3000/register/user/update_address/:id
router.put('/update_address/:id' , controllers.UpdateAddressUser)

// Update requestion = http://localhost:3000/register/user/add_payments
router.post('/add_payments' , controllers.ToAddPayments)

// Update requestion = http://localhost:3000/register/user/update_payments/:id
router.put('/update_payments/:id' , controllers.UpdatePaymentsUser)


module.exports = app => app.use('/register/user' , router)