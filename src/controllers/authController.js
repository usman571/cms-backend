const User = require('../models/User');
const { generateToken, verifyToken } = require('../utils/jwt');
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
            _id: user._id,
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
         status: true,
         message: 'Login successful',
         data: {
            accessToken: token,
         }
      });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
};




const whoAmI = async (req, res) => {
   try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
         return res.status(401).json({
            status: false,
            code: 'AUTH_0001',
            message: 'No token provided'
         });
      }

      const decoded = verifyToken(token);
      const user = await User.findById(decoded._id).select('-password');

      if (!user) {
         return res.status(404).json({
            status: false,
            code: 'AUTH_0002',
            message: 'Error validating user token'
         });
      }
      res.json({
         status: true,
         data: {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role
         }
      });
   } catch (error) {
      res.status(401).json({
         status: false,
         code: 'AUTH_0002',
         message: 'Error validating user token'
      });
   }
};
module.exports = { signup, login, whoAmI };