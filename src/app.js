const express = require('express');
const connectDB = require('./config/database'); // Relative path to the database file
const User = require('./models/user'); 
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/signup", async (req, res) => {

   
    try {
        // Create a new instance of the User model
        const user = new User(req.body);
        // Save the user in the database
        await user.save();
        
    } catch (err) {
        console.error("Error adding user:", err);
        res.status(500).send("Error adding user");
    }
    
   res.send("hii")
});

// Connect to the database and start the server
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(777, () => {
        console.log("Server is connected successfully on port 777!");
    });
}).catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1); // Exit process with failure
});
