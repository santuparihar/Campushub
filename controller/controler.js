const { name } = require('ejs');
const { checkUser } = require('../middlewares/auth');
const {askAI} = require('../bot/index');
const User = require('../model/schema');
const {setUser , getUser} = require('../service/auth');
const {checknormal , checkadmin} = require('../service/authorization');
const {v4 : uuidv4} = require("uuid");
const upload = require('../middlewares/photo');

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
    const {name , email , course , year , gender , password} = req.body;

    const user =  await User.create({
        name,
        email,
        course,
        year,
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
            maxAge : 2 * 60 * 60 * 1000,
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
    const decode = getUser(req.cookies?.uid);
     
    req.user = decode;
    console.log(req.user.photo);
    console.log("Decode Hit");
    console.log(req.user);

    res.render("profile" , { user : req.user });
}

async function showevents(req ,res){
    const decode = getUser(req.cookies?.uid);

    req.user = decode;

    res.render("event" , {user : req.user});
}

async function showedit(req , res){
    const decode = getUser(req.cookies?.uid);

    req.user = decode;

    res.render("edit" , {user : req.user});
}

async function showcomm(req , res){
    const decode = getUser(req.cookies?.uid);

    req.user = decode;

    res.render("community" , {user : req.user});
}

async function showai(req ,res){
    const decode = getUser(req.cookies?.uid);

    req.user = decode;

    res.render("ai" , {user : req.user});
}

async function showanounc(req ,res){
    const decode = getUser(req.cookies?.uid);
    req.user = decode;

    res.render("announcement" , {user : req.user});
}

async function showcollege(req,res){
    const decode = getUser(req.cookies.uid);
    req.user = decode;

    res.render("college" , {user : req.user});
}

async function showsetting(req ,res){
   const decode = getUser(req.cookies.uid);
    req.user = decode;

    res.render("setting" , {user : req.user});
}

async function showcourse(req , res){
    const decode = getUser(req.cookies.uid);
    req.user = decode;

    res.render("course" , {user  : req.user});
}

async function showresource(req , res){
     const decode = getUser(req.cookies.uid);
    req.user = decode;

    res.render("resource" , {user : req.user});
}

async function editprofile(req, res) {
    const decoded = getUser(req.cookies?.uid);
    if (!decoded) return res.status(401).send("Not logged in");

    try {
        const { name, email, course, gender, bio } = req.body;

        const updated = await User.findByIdAndUpdate(
            decoded.id,
            { name, email, course, gender, bio },
            { new: true, runValidators: true }
        );

        if (!updated) return res.status(404).send("User not found");
        return res.status(200).json({ message: "Profile updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).send("error");
    }
}

async function logout(req ,res){
    const decoded = getUser(req.cookies?.uid);

    const user = decoded;

    if(!user) res.status(401).redirect('/');

    res.clearCookie("uid");
    return res.status(200).redirect('/');
}

async function AI(req ,res){
   try {
    const {message} = req.body;

    if(!message){
        return res.status(400).json({
            message : "Message is required"
        });
    }

     const answer = await askAI(message);

     return res.json({
        reply: `${answer}`
     });

    
   } catch (error) {
      console.log(error);

      return res.status(500).json({
        message : "AI Failed to respond"
      });
   }

}

async function photo(req ,res){
    const decode = getUser(req.cookies?.uid);

    req.user = decode;
     console.log("Decode2 hit");
    console.log(req.user);

    res.render("photo" , {user : req.user});
}

async function updatephoto(req , res){
    const decode =  getUser(req.cookies?.uid);


    if(!req.file){
        return res.status(401).send("please provide the file : ");
    }

    const photo = req.file.filename;
  
       try {
   
         const update = await User.findByIdAndUpdate(decode.id ,
            {photo : photo } , 
            {new : true , runValidators : true}
         );

         if(!update){
           return res.status(400).send("somethign went wrong : ").redirect("/main/profile/edit");
         }

         return res.status(200).redirect("/main/profile");
        
       } catch (error) {
         return res.status(500).send("something went wrong internal error ! ").redirect("/main/proile/edit");
       }
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
    showcourse,
    showresource,
    editprofile,
    logout,
    AI,
    photo,
    updatephoto,
};