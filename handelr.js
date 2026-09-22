const express = require('express');
const {handelserve , showsignup , showlogin ,  handelsignup , handellogin , showmain } = require('./controller/controler');
const {restrictologin} = require('./middlewares/auth');

const router = express.Router();

router.get('/' , handelserve);

router.get('/signup' , showsignup);
router.get('/login' , showlogin)

router.post('/signup' ,  handelsignup);
router.post('/login' , handellogin);

router.get('/main' , showmain);

module.exports = router;