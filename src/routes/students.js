// src/routes/students.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/roleCheck');
const {
   getAllStudents,
   getStudentById,
   updateStudent,
   deleteStudent
} = require('../controllers/studentController');

// Get all students (accessible by admin and teachers)
router.get('/',
   auth,
   checkRole(['admin', 'teacher']),
   getAllStudents
);

// Get specific student (accessible by admin, teachers, and the student themselves)
router.get('/:id',
   auth,
   async (req, res, next) => {
      if (req.userId === req.params.id) {
         return next();
      }
      checkRole(['admin', 'teacher'])(req, res, next);
   },
   getStudentById
);

// Update student (accessible by admin and the student themselves)
router.patch('/:id',
   auth,
   async (req, res, next) => {
      if (req.userId === req.params.id) {
         return next();
      }
      checkRole(['admin'])(req, res, next);
   },
   updateStudent
);

// Delete student (accessible only by admin)
router.delete('/:id',
   auth,
   checkRole(['admin']),
   deleteStudent
);

module.exports = router;