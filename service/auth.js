const jwt = require('jsonwebtoken');
const secret = "Santu@147258369";

function setUser(user){
     return jwt.sign({
         id : user._id,
         email : user.email,
     },
    secret,{
      expiresIn : "2m"
    }
   );
}

function getUser(token){
   if(!token) return null;

   try {
      return jwt.verify(token , secret);
   } catch (error) {
      return null;
   }
}

module.exports = {
    setUser,
    getUser,
}