const express = require('express');
const controllers = require('../../controllers/users/public.controllers')
const router = express.Router();

// Newa Register requestion = http://localhost:3000/users/news

router.post('/news', controllers.NewsREgister)
// SignIn requestion = http://localhost:3000/users/login
router.post('/login' , controllers.SignIn);

module.exports = app => app.use('/users', router)