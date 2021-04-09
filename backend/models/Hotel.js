const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    hotel_name: {
        type: String,
        required: [true, 'Please enter hotel name'],
        unique: [true, "Duplicate hotel name is  Not allowed"],
        trim: true,
        lowercase: true
  },
    street: {
        type: String,        
        required: true,
        trim: true,
        lowercase: true
    },
    city: {
        type: String,       
        required: true,
        trim: true,
        lowercase: true
    },
    postal_code: {
        type: String,        
        required: true,
        trim: true,
        lowercase: true
    },
    price: {
        type: Number,
        default: 0.0,    
        validate(value) {
        if (value < 0.0){
            throw new Error("Negative Price is not allowed.");
        }
        }
    },
  
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;