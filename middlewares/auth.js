const jwt = require('jsonwebtoken');
const user = require("../model/schema")
const { getUser , setUser} = require("../service/auth");
const {checknormal , checkadmin} = require("../service/authorization");

function restrictologin(req, res, next) {
    const token = req.cookies.uid;

    console.log("TOKEN:", token);

    if (!token) {
        console.log("❌ NO TOKEN");
       next();
       return res.status(200)
    }

    const user = getUser(token);

    if (!user) {
        console.log("❌ INVALID TOKEN");
        res.clearCookie("uid");
       next();
       return res.status(200);
    }

    console.log("✅ AUTHENTICATED");

    req.user = user;

    next();
}


async function checkUser(req, res, next) {

    console.log("====== check user =======");
    console.log("URL:", req.originalUrl);

    console.log("all cookies : " , req.cookies.uid);

    const token = await req.cookies.uid;


    // No cookie = normal visitor
    if (!token) {
        console.log("NO COOKIE → showing index");
        return next();
    }

    const user = await getUser(token);

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

async function checkauthorization(req, res, next) {
    const token = req.cookies.uid;          // was: token

    if (!token) return res.redirect("/");

       try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            res.clearCookie("uid");   // remove the stale cookie
            return res.redirect("/");
        }

        req.user = user;   // fresh data from the DB, including gender
        next();
    } catch (err) {
        res.clearCookie("uid");       // invalid or expired token
        return res.redirect("/");
    }
}

module.exports ={
    restrictologin, checkUser, checkauthorization,
}