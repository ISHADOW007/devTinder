const mongoose = require("mongoose");

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
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min:18
  },
  gender: {
    type: String,
    validate(value){
        if(!["male","female","other"].includes(value)){
            throw new Error("gender data is not valid")
        }
    }
  },
  photoUrl: {
    type: String,
    default:"https://www.freepik.com/free-photos-vectors/default-user"
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
