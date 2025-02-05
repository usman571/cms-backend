const mongoose = require('mongoose');
const environment = require('./environment');

const connectDB = async () => {
   try {
      await mongoose.connect(environment?.mongodbUri);
      console.log('MongoDB connected successfully');
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
   }
};

module.exports = connectDB;