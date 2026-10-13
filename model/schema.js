const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
 

       name:{
        type : String,
        required : true,
       },

       email:{
           type : String,
           required : true,
           unique : true,
       },

       course:{
          type : String,
          required : true,
       },

       year:{
           type : String,
           required : true,
       },

       gender:{
        type:String,
        required : true,
       },

       password:{
           type : String,
           required : true,
       },
       
       bio:{
        type : String,
        default : " "
       },

      photo :{
         type : String,
         default : "blank.png",
      },

        type_id: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    
});

  const User = mongoose.model("User" , UserSchema);

  module.exports = User;