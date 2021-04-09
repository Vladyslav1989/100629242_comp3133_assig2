const mongoose = require('mongoose');



const UserSchema = new mongoose.Schema({
    username: {
    type: String,
    required: [true, 'Please enter first name'],
    unique: [true, "Duplicate username is  Not allowed"],
    trim: true,
    lowercase: true
  },
  password: {
    type: String,    
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,    
    unique: [true, "Duplicate Email Not allowed"],
    trim: true,
    uppercase: true,    
    validate: function(value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    }
  }, 
 
});

const User = mongoose.model("User", UserSchema);
module.exports = User;