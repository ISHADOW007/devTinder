const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDB = async () => {
   await  mongoose.connect("mongodb+srv://satyam007:zoCvZOytxtbhMQZL@cluster0.nv4ce.mongodb.net/devTinder",{
    
   
  })
}
  
  
// Export the function for use in other files
module.exports = connectDB;
