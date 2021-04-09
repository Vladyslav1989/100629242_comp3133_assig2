const express = require('express');
const jwt =  require('jsonwebtoken')
const mongoose = require('mongoose');
const TypeDefs = require('./schema');
const Resolvers = require('./resolvers');
const bodyParser = require('body-parser');
const User = require('./models/User');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');


const dotenv = require('dotenv');
dotenv.config();


const url = process.env.MONGODB_URL;

const connect = mongoose.connect(url, 
{ 
      useNewUrlParser: true,
      useUnifiedTopology: true
});

connect.then((db) => {
      console.log('Connected correctly to server!');
}, (err) => {
      console.log(err);
});


const server = new ApolloServer({
      typeDefs: TypeDefs.typeDefs,
      resolvers: Resolvers.resolvers
});


const app = express();
app.use(bodyParser.json());
app.use('*', cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`));
  
  
  

  function verifyToken(req, res, next) {
      if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
      }
      let token = req.headers.authorization.split(' ')[1]
      if(token === 'null') {
        return res.status(401).send('Unauthorized request')    
      }
      try {
        let payload = jwt.verify (token, 'secretKey')
        req.userId = payload.subject
        next ()

    } catch (err) {
        return res.status (401) .send ('Unauthorized request')

    }
    }

    
    app.get('/booking',  verifyToken,(req, res) => {
     console.log("there")
      //res.json(specialEvents)
    })
    app.get('/bookhotel',verifyToken,  (req, res) => {
      console.log('here')
     })
    
  /////
app.post('/login', (req, res) => {
      let userData = req.body
      console.log(userData)
      User.findOne({email: userData.email}, (err, user) => {
        if (err) {
          console.log(err)    
        } else {
          if (!user) {
            res.status(401).send('Invalid Email')
          } else 
          if ( user.password !== userData.password) {
            res.status(401).send('Invalid Password')
          } else {
                //res.status(200).send(user)
            //verifyToken(req,res)
            let payload = {subject: user._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token}) // respons with the token insted of user daat
          }
        }
      })
    })
////
