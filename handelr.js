const express = require('express');
const {handelserve , showsignup , showlogin ,  handelsignup , handellogin , showmain } = require('./controller/controler');
const {restrictologin} = require('./middlewares/auth');

const router = express.Router();

router.get('/' , handelserve);

router.post('/signup' ,  handelsignup);
router.post('/login' ,  handellogin);

router.get('/signup' ,  showsignup);
router.get('/login' ,  showlogin)



router.get('/main' , restrictologin ,  showmain);

module.exports = router;