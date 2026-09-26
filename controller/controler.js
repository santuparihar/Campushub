const { checkUser } = require('../middlewares/auth');
const User = require('../model/schema');
const {setUser , getUser} = require('../service/auth');
const {v4 : uuidv4} = require("uuid");

async function handelserve(req , res){
   return res.render("index");
};

async function showsignup(req , res){
    res.render("signup");
}

async function showlogin(req , res){
   return res.render("login");
}

async function handelsignup(req , res){
    const {name , email , course , gender , password} = req.body;

    const user =  await User.create({
        name,
        email,
        course,
        gender,
        password,
    });

    
    const token  = setUser(user);

    res.cookie("uid" , token);

    return res.redirect("/main");
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

        const  token = setUser(user);
        
        console.log(token);
        
        res.cookie("uid" , token , {
            httpOnly : true,
            maxAge : 2 * 24 * 60 * 60 * 1000,
        });
       return res.redirect("/main");
    }

    return  res.send(`<script>
            alert("Wrong Password");
            window.history.back();
        </script>`);
}

async function showmain(req , res){
    res.render("main" , {
        user : req.user
    });
}

async function showprofile(req , res){
    res.render("profile");
}

async function showevents(req ,res){
    res.render("event");
}

async function showedit(req , res){
    res.render("edit");
}

async function showcomm(req , res){
    res.render("community");
}

async function showai(req ,res){
    res.render("ai");
}

async function showanounc(req ,res){
    res.render("announcement");
}

async function showcollege(req,res){
    res.render("college");
}

async function showsetting(req ,res){
    res.render("setting");
}

module.exports = {
    handelserve,
    showsignup,
    showlogin,
    handellogin,
    handelsignup,
    showmain,
    showprofile,
    showevents,
    showedit,
    showcomm,
    showai,
    showanounc,
    showcollege,
    showsetting,
};