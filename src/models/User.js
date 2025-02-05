const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
   },
   password: {
      type: String,
      required: true,
      minlength: 6,
   },
   role: {
      type: String,
      enum: ['admin', 'teacher', 'student', 'parent'],
      default: 'student',
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
   return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);