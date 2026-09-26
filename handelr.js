const express = require('express');
const {handelserve , showsignup , showlogin ,  handelsignup , handellogin , showmain , showprofile, showevents
 , showedit , showcomm , showai , showanounc , showcollege , showsetting
} = require('./controller/controler');


const {restrictologin , checkUser} = require('./middlewares/auth');

const router = express.Router();

router.get('/' , checkUser , handelserve);

router.post('/signup' ,  handelsignup);
router.post('/login' ,  handellogin);

router.get('/signup' , checkUser , showsignup);
router.get('/login' , checkUser ,  showlogin);



router.get('/main' , restrictologin ,  showmain);
router.get('/main/profile' ,  showprofile);
router.get('/main/events' , showevents);
router.get('/main/profile/edit' , showedit);
router.get('/main/community' , showcomm);
router.get('/main/AI-helper' , showai);
router.get('/main/announcement' , showanounc);
router.get('/main/college-info' , showcollege);
router.get('/main/settings' , showsetting);



module.exports = router;