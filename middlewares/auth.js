const {getuser} = require("../service/auth");

async function restrictologin(req , res , next){
     const useruid = req.cookie.uid;

     if(!useruid){
        return res.redirect("/");
     }

     const user = getuser(useruid);

     if(!user) return res.redirect("/signup.html");

     req.user = user;
     next();
}

module.exports = {
    restrictologin,
}