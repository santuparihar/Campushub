const User = require('../model/schema');
const {setUser} = require('../service/auth');
const {v4 : uuidv4} = require("uuid");

async function handelserve(req , res){
    res.render("index");
};

async function showsignup(req , res){
    res.render("signup");
}

async function showlogin(req , res){
    res.render("login");
}

async function handelsignup(req , res){
    const {name , email , course , gender , password} = req.body;

    const user = User.create({
        name,
        email,
        course,
        gender,
        password,
    });
    console.log(user);

    return res.redirect("main");
};

async function handellogin(req ,res){
   const email = req.body.email;
   const password = req.body.password;

   const user = await User.findOne({email : email});

     if (!user) {
        console.log("user not found");

        return res.send(`
            <script>
                alert("User not found");
                window.history.back();
            </script>
        `);
    }

    const realpass = user.password;

    if(realpass === password){

        const sessionId = uuidv4();
        setUser(sessionId , user);
        res.cookie("uid" , sessionId);
       return res.redirect("main");
    }

    return  res.send(`<script>
            alert("Wrong Password");
            window.history.back();
        </script>`);
}

async function showmain(req , res){
    res.render("main");
}

module.exports = {
    handelserve,
    showsignup,
    showlogin,
    handellogin,
    handelsignup,
    showmain,
};