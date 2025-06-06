const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userAuthRoutes = require('./routes/auth/userauth');
const eventRoutes = require('./routes/events/eventsRoute')

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userAuthRoutes);
app.use('/api/events', eventRoutes);


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/userdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
