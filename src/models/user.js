const mongoose=require("mongoose")


const userSchema = new mongoose.Schema(
  {
    // User's unique username
    firstName: {
        type: String,
              // Trim any surrounding white spaces
      },
    lastName: {
      type: String,
             // Trim any surrounding white spaces
    },
    // User's unique email
    emailID: {
      type: String,
          
    },
    
    password: {
      type: String,
    
    },
   
  },
 
);


const User= mongoose.model("User",userSchema)

module.exports=User;