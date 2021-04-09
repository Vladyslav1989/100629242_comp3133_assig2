const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookingSchema = new mongoose.Schema({
 
    booking_date: {
    type: Date,
    
  },
    booking_start: {
        type: Date,
        
    },
    booking_end: {
        type: Date,
        
    },
    hotel: {
        type: Schema.Types.ObjectId,
        ref: 'Hotel'
      },
      user: {
        type: Schema.Types.String,
        ref: 'User'
      },
    
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;