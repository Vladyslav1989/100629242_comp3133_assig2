const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
scalar Date 
   type Hotel {
     hotel_id: ID!
     hotel_name: String!
     street: String!
     city: String!
     postal_code: String!     
     price: Float!
     booking:[Booking]
     
   }
   type Booking {
    user:[User!]
    hotel:[Hotel!]
    Booking_id: ID!
    booking_date: Date!
    booking_start: Date!
    booking_end: Date!
    
  }
  type User {
    user_id: ID!
    username: String!
    password: String!
    email: String! 
    booking:[Booking]
  }

   type Query {
     getHotel: [Hotel]
     getHotelByName(hotel_name: String!): [Hotel]
     getHotelByCity(city: String!): [Hotel]
     getUser: [User]
     getUserByName(username: String!): [User]
     getBooking(user: String!):[Booking]
   }

   type Mutation {
     addHotel(       
        hotel_name: String!
        street: String!
        city: String!
        postal_code: String!
        city: String!
        price: Float!): Hotel

        addUser(
            username: String!
            password: String!
            date: Date
            email: String!): User 

        BookHotel(
          booking_date: Date!
          booking_start: Date!
          booking_end: Date!     
          email: String!   
          hotel_name: String!): Booking! 
            
     
   }
`