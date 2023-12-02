const express = require('express');
const app = express();
const base64url = require('base64url');
require('dotenv').config();
const jwt = require('jsonwebtoken');

app.post('/login', async(req, res) => {
   const initialPassKey = req.headers['x-initial-pass-key'];
   const identifier = req.body.identifier;
   const password = req.body.password;
   const jwtSecret = process.env.JWT_SECRET;

   const initialPassKeyEnv = process.env.PASS_KEY;
   if (initialPassKeyEnv !== initialPassKey) {
      res.status(401).send('Unauthorized');
      return;
   }
   if(identifier !== 'admin' || password !== 'admin') {
      res.status(401).send('Invalid User Or Password');
      return;
   }

   const jwtPayload = {
      'identifier': identifier
   };

   const jwtToken =await jwt.sign(jwtPayload, jwtSecret, { expiresIn: '1h' }); // expires in 1 hour
   const encodedToken = base64url.encode(jwtToken);
   const bearerToken = `Bearer ${encodedToken}`;
   res.json(bearerToken);

   return;

});


module.exports=app;


