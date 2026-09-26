const { getUser , setUser} = require("../service/auth");

async function restrictologin(req, res, next) {

    console.log("========== AUTH CHECK ==========");
    console.log("URL:", req.originalUrl);
    console.log("COOKIE:", req.cookies);
    
    const token = req.cookies.uid;

    if (!token) {
        console.log("❌ NO TOKEN");
        return res.redirect("/login");
    }

    const user = getUser(token);

    console.log("TOKEN:", token);
    console.log("USER:", user);

    if (!user) {
        console.log("❌ INVALID TOKEN");
        return res.redirect("/login");
    }

    console.log("✅ AUTHENTICATED");

    req.user = user;
    next();
}

function checkUser(req, res, next) {

    console.log("====== check user =======");
    console.log("URL:", req.originalUrl);

    const token = req.cookies.uid;

    // No cookie = normal visitor
    if (!token) {
        console.log("NO COOKIE → showing index");
        return next();
    }

    const user = getUser(token);

    // Cookie exists but JWT is invalid/expired
    if (!user) {
        console.log("INVALID COOKIE → showing index");
        return next();
    }

    // Valid cookie
    console.log("VALID COOKIE → redirecting to main");

    req.user = user;

    return res.redirect("/main");
}


module.exports ={
    restrictologin, checkUser,
}