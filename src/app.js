const express = require('express');
const connectDB = require('./config/database'); // Relative path to the database file
const User = require('./models/user'); 
const { ReturnDocument } = require('mongodb');
const app = express();


// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/signup", async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(`User created successfully! ${user}`); // Send a success message after saving
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(400).send(`User created unsuccessfully! ${err}`); // Change status to 400 for validation errors
    }
});



app.get("/users", async (req, res) => {
              
     const userEmail=req.body.emailID;
     
     try {
        const user= await User.find({emailID:userEmail})
        console.log(user)
        if(!user.length)
        {
            res.status(404).send("user not found")
        }
        else{
            res.send(user);
        }
        
        
     } catch (err) {
        res.status(400).send("something went wrong")
     }
})

app.get("/user", async (req, res) => {
              
    const userEmail=req.body.emailID;
    
    try {
       const user= await User.findOne({emailID:userEmail})
       
       if(!user)
       {
           res.status(404).send("user not found")
           console.log(user)
       }
       else{
           res.send(user);
       }
       
       
    } catch (err) {
       res.status(400).send("something went wrong")
    }
})

app.delete("/user", async (req, res) => {
              
    const userId=req.body.userId;
    
    try {
       const user= await User.findByIdAndDelete(userId)
      // const user= await User.findByIdAndDelete({userID:userID})
       res.send("user deleted successfully")
       
           
       
       
       
    } catch (err) {
       res.status(400).send("something went wrong")
    }
})
//any other data rather than the data present in ther user schema while updating will be ignored

app.patch("/user/:userID", async (req, res) => {
    const userId = req.params?.userID;
    const data = req.body;  // This will contain the fields you want to update
   
    
    try {

        const ALLOWED_UPDATES = ["userId", "photoUrl", "about", "gender", "age", "skills"];
    
        let keys = []; // Initialize an array to hold invalid keys
        const isUpdatedAllowed = Object.keys(data).every((k) => {
            if (!ALLOWED_UPDATES.includes(k)) {
                keys.push(k); // Add invalid keys to the array
                return false; // If any key is not allowed, return false
            }
            return true; // If the key is allowed, return true
        });
    
        if (!isUpdatedAllowed) {
            return res.status(400).send(`${keys.join(', ')} are not allowed to update`); // Send the invalid keys
        }
        if(data.skills?.length>10){
            throw new Error("skills length cannot be greater than 10")
        }
        // Find the user by ID and update with the new data
        const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true });
        
        // If no user was found, send a 404 error
        if (!user) {
            return res.status(404).send("User not found");
        }
        
        // If the user is updated successfully, return the updated user
        res.send({ message: "User updated successfully", user });
    } catch (err) {
        // Send a generic error response if something goes wrong
        console.error(err);
        res.status(400).send(`Something went wrong,${err}`);
    }
});


//feed api  -get/feed- get all the user from the database
app.get("/feed",async (req,res)=>{

    try {
        const user= await User.find({})
        console.log(user)
        if(!user.length)
        {
            res.status(404).send("user not found")
        }
        else{
            res.send(user)
        }
        
        
     } catch (err) {
        res.status(400).send("something went wrong")
     }
})

// Connect to the database and start the server
connectDB().then(() => {
    console.log("Database connected successfully");
    
    
    app.listen(777, () => {
        console.log("Server is connected successfully on port 777!");
    });
}).catch((err) => {
    console.error("Database connection failed", err.message);
    process.exit(1); // Exit process with failure
});
