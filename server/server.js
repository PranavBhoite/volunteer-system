const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { syncDB } = require('./models'); // Sync Sequelize models

// Route imports
const userAuthRoutes = require('./routes/auth/userauth');
const eventRoutes = require('./routes/events/eventsRoute');
const userRoutes = require('./routes/user/userRoute');
const adminRoutes = require('./routes/auth/adminauth');
const accountRoutes = require('./routes/admin/accountRoutes');
const helpRoutes = require('./routes/help/helpRoute');
const statsRoute = require('./routes/stats/stateRoute');
const requirementsRoutes = require('./routes/requirements/requirementsRoute');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', userAuthRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth/admin', adminRoutes);
app.use('/api/admin', accountRoutes);
app.use('/api/help', helpRoutes);
app.use('/api', statsRoute);
app.use('/api/requirements', requirementsRoutes);


// PostgreSQL connection via Sequelize
syncDB(); // Syncs all models with DB

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
