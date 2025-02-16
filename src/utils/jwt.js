const jwt = require('jsonwebtoken');
const environment = require('../config/environment');

const generateToken = (userId) => {
   return jwt.sign({ _id: userId }, environment.jwtSecret, {
      expiresIn: environment.jwtExpiry,
   });
};

const verifyToken = (token) => {
   return jwt.verify(token, environment.jwtSecret);
};

module.exports = { generateToken, verifyToken };

