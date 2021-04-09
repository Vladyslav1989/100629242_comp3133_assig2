const User = require('./models/User');
const Hotel = require('./models/Hotel');
const Booking = require('./models/Booking');
const mongoose = require('mongoose');

exports.resolvers = {

    Query: {
        getUser: async (parent, args) => {
            return await User.find({});
        },        

        getHotel: async (parent, args) => {
            return await Hotel.find({});
        },

        getHotelByName: async (parent, args) => {
            
            return await Hotel.find({"hotel_name" : args.hotel_name});
        }, 
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({"city" : args.city});
        }, 

        getUserByName: async (parent, args) => {
            return await User.find({"username" : args.username});
        },
        getBooking: async (parent, args) => {
            //return await Booking.find({}); returns all bookings
            
            return await Booking.find({"user": args.user});
            
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
           
            const emailExpression = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            const isValidEmail =  emailExpression.test(String(args.email).toLowerCase())
            
            if(!isValidEmail){
                throw new Error("Please use proper format for Email")
            }

            let newUser = new User({
                username: args.username,
                password: args.password,
                email: args.email,
            });
        return await newUser.save();
      },

        addHotel: async (parent, args) => {
            let newHotel = new Hotel({
                hotel_name: args.hotel_name,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
            
            });
        return await newHotel.save();
    },
        BookHotel: async (parent, args) => {    
        const fetchedUser = await User.findOne({"email" : args.email});
        console.log(fetchedUser.email)
        const fetchedEvent = await Hotel.findOne({"hotel_name" : args.hotel_name}); 
        let newBooking = new Booking({
                hotel: fetchedEvent,
                user:fetchedUser.email,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
        });
    return await newBooking.save();
    },

     
    }
  }
  

  