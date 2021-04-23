const express = require('express');
const controllers = require('../../controllers/stores/public.controllers')
const router = express.Router();

// Newa Register requestion = http://localhost:3000/stores/product_list

router.get('/product_list', controllers.FullGetProducts)


module.exports = app => app.use('/stores', router)