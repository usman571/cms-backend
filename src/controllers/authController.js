const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const signup = async (req, res) => {
   try {
      const { username, email, password, role } = req.body;

      const user = new User({
         username,
         email,
         password,
         role,
      });

      await user.save();
      const token = generateToken(user._id);

      res.status(201).json({
         message: 'User created successfully',
         token,
         user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
         },
      });
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
};

const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateToken(user._id);
      res.json({
         message: 'Login successful',
         token,
         user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
         },
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};

module.exports = { signup, login };