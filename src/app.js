const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const swagger = require('./config/swagger'); // Add this line
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const studentRoutes = require('./routes/students');
const errorHandler = require('./middleware/errorHandler');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Add swagger docs - add this line
app.use('/api-docs', swagger.serve, swagger.setup);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});

module.exports = app;