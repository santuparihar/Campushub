const express = require('express');
const {handelserve , showsignup , showlogin ,  handelsignup , handellogin , showmain } = require('./controller/controler');
const {restrictologin , checkUser} = require('./middlewares/auth');

const router = express.Router();

router.get('/' , checkUser , handelserve);

router.post('/signup' ,  handelsignup);
router.post('/login' ,  handellogin);

router.get('/signup' , checkUser , showsignup);
router.get('/login' , checkUser ,  showlogin)



router.get('/main' , restrictologin ,  showmain);

module.exports = router;