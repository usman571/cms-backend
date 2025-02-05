require('dotenv').config();

const environment = {
   port: process.env.PORT || 5000,
   mongodbUri: process.env.MONGODB_URI,
   jwtSecret: process.env.JWT_SECRET,
   jwtExpiry: process.env.JWT_EXPIRY
};


module.exports = environment;