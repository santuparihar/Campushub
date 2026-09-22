const express = require('express');
const {handelserve , handelsignup , handellogin } = require('./controller/controler');
const {restrictologin} = require('./middlewares/auth');

const router = express.Router();

router.get('/' , handelserve);

router.post('/signup' ,  handelsignup);
router.post('/login' , handellogin);

module.exports = router;