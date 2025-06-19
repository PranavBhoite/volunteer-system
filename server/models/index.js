const sequelize = require('../config/db');
const User = require('./User');
const Admin = require('./Admin');
const Help = require('./Help');
const Event = require('./EventModel');

// Define associations if needed (example):
// User.hasMany(Event); // if user creates events
// Event.belongsTo(User);

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true }); // or { force: true } for dev reset
    console.log("✅ All models synced successfully.");
  } catch (error) {
    console.error("❌ Error syncing models:", error);
  }
};

module.exports = {
  sequelize,
  User,
  Admin,
  Help,
  Event,
  syncDB,
};
