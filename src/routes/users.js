const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');
const User = require('../models/User'); // Add this line - import the User model

// Protected route example - only accessible by admin and teachers
router.get('/students',
   auth,
   checkRole(['admin', 'teacher']),
   async (req, res) => {
      try {
         const students = await User.find({ role: 'student' });
         res.json(students);
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
);

module.exports = router;