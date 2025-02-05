const { verifyToken } = require('../utils/jwt');

const auth = async (req, res, next) => {
   try {
      const token = req.header('Authorization')?.replace('Bearer ', '');
      if (!token) {
         return res.status(401).json({ message: 'Authentication required' });
      }

      const decoded = verifyToken(token);
      req.userId = decoded.id;
      next();
   } catch (error) {
      res.status(401).json({ message: 'Invalid token' });
   }
};

module.exports = auth;