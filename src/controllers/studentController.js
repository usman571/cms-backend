// src/controllers/studentController.js
const User = require('../models/User');

const getAllStudents = async (req, res) => {
   try {
      const students = await User.find({ role: 'student' })
         .select('-password'); // Exclude password from response
      res.json(students);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const getStudentById = async (req, res) => {
   try {
      const student = await User.findOne({
         _id: req.params.id,
         role: 'student'
      }).select('-password');

      if (!student) {
         return res.status(404).json({ message: 'Student not found' });
      }
      res.json(student);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const updateStudent = async (req, res) => {
   try {
      const allowedUpdates = ['username', 'email'];
      const updates = Object.keys(req.body)
         .filter(key => allowedUpdates.includes(key))
         .reduce((obj, key) => {
            obj[key] = req.body[key];
            return obj;
         }, {});

      const student = await User.findOneAndUpdate(
         { _id: req.params.id, role: 'student' },
         updates,
         { new: true }
      ).select('-password');

      if (!student) {
         return res.status(404).json({ message: 'Student not found' });
      }

      res.json(student);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

const deleteStudent = async (req, res) => {
   try {
      const student = await User.findOneAndDelete({
         _id: req.params.id,
         role: 'student'
      });

      if (!student) {
         return res.status(404).json({ message: 'Student not found' });
      }

      res.json({ message: 'Student deleted successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = {
   getAllStudents,
   getStudentById,
   updateStudent,
   deleteStudent
};