const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim:true,
    minlength:4
  },
  lastName: {
    type: String,
    trim:true
  },
  emailID: {
    type: String,
    required: true,
    unique: true,  // Ensure unique index for email
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error('email is not valid')
        }
    }
  },
  password: {
    type: String,
    required: true,
    validate(value) {
        if (!validator.isStrongPassword(value)) {
            throw new Error(`Password is not strong enough. It must contain at least 8 characters, including uppercase, lowercase, numbers, and symbols.`);
        }
    }
},
 
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value) {
        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(value.toLowerCase())) {
            throw new Error("gender data is not valid");
        }
    }
  },
  photoUrl: {
    type: String,
    default:"https://www.freepik.com/free-photos-vectors/default-user",
    validate(value){
        if(!validator.isURL(value)){
            throw new Error(`URL is not valid ${value}`)
        }
    }
  },
  
  about: {
    type: String,
    default: "this is a default value of user",
  },
  skills: {
    type: [String],
  },
},{
    timestamps:true
});

userSchema.index({ emailID: 1 }, { unique: true });  // Explicitly create index

const User = mongoose.model("User", userSchema);

module.exports = User;
