const express = require('express');
const {handelserve , showsignup , showlogin ,  handelsignup , handellogin , showmain , showprofile, showevents
 , showedit , showcomm , showai , showanounc , showcollege , showsetting , showcourse , showresource ,
 editprofile, logout , AI, photo , updatephoto,
} = require('./controller/controler');

const upload = require('./middlewares/photo')
const {restrictologin , checkUser , checkauthorization} = require('./middlewares/auth');
const  {storage} = require('./middlewares/photo');
const router = express.Router();

router.get('/' , handelserve);

router.post('/signup' ,  handelsignup);
router.post('/login' ,  handellogin);

router.get('/signup' , checkUser , showsignup);
router.get('/login' , checkUser ,  showlogin);



router.get('/main' , restrictologin ,  showmain);
router.get('/main/profile' ,  showprofile);
router.get('/main/events' , showevents);

router.get('/main/profile' , showprofile);
router.patch('/main/profile/edit' , editprofile);
router.get('/main/community' , showcomm);
router.get('/main/AI-helper' , showai);
router.get('/main/announcement' , showanounc);
router.get('/main/college-info' , showcollege);
router.get('/main/settings' , showsetting);
router.get('/main/profile/course' , showcourse);
router.get('/main/profile/resources' , showresource);



router.get('/main/profile/edit' , showedit);
router.patch('/main/profile/edit', checkauthorization ,editprofile);

router.get('/main/logout' , logout);

router.post('/main/AI-helper' , AI);

router.get('/main/profile/edit/Change-Profile-photo' , photo);
router.post('/main/profile/edit/Change-Profile-photo' , upload.single("profile-photo") ,updatephoto);

module.exports = router;