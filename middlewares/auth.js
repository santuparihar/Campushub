const { getUser } = require("../service/auth");

async function restrictologin(req, res, next) {

    const token = req.cookies.uid;
   
    console.log(token);
    if (!token) {
        return res.redirect("/login");
    }

    const user = getUser(token);

    if (!user) {
        return res.redirect("/login");
    }

    req.user = user;
    console.log("user" , req.cookies.uid);
    console.log("user" , getUser(req.cookies.uid));
    next();
}

module.exports = {
    restrictologin,
};