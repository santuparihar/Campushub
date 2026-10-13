const jwt = require('jsonwebtoken');
const secret = "Santu@147258369";

function setUser(user){
     return jwt.sign({
          id : user._id,
         email : user.email,
         name : user.name,
         course : user.course,
         year : user.year,
         gender : user.gender,
         bio : user.bio,
         photo : user.photo,
     },
    secret,{
      expiresIn : "2h"
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