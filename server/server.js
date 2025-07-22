const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDB } = require('./models'); // Sync Sequelize models

// Load environment variables FIRST
dotenv.config();

// Initialize Express app BEFORE using it
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://frontend:3000',
    'http://127.0.0.1:3000'
  ],
  credentials: true
}));

// Middleware
app.use(express.json());

// Route imports - move these AFTER app initialization
const userAuthRoutes = require('./routes/auth/userauth');
const eventRoutes = require('./routes/events/eventsRoute');
const userRoutes = require('./routes/user/userRoute');
const adminRoutes = require('./routes/auth/adminauth');
const accountRoutes = require('./routes/admin/accountRoutes');
const helpRoutes = require('./routes/help/helpRoute');
const statsRoute = require('./routes/stats/stateRoute');

// Routes
app.use('/api/auth', userAuthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth/admin', adminRoutes);
app.use('/api/admin', accountRoutes);
app.use('/api/help', helpRoutes);
app.use('/api', statsRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// PostgreSQL connection via Sequelize
syncDB(); // Syncs all models with DB

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
