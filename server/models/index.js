const sequelize = require('../config/db');
const User = require('./User');
const Event = require('./EventModel');
const EventUserMap = require('./EventUserMapModel');
const Admin = require('./Admin');
const Requirement = require('./RequirementModel');
const RequirementClick = require('./RequirementClickModel');

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

//associate users and events registered and completed by them
User.hasMany(EventUserMap, { foreignKey: 'userId' });
EventUserMap.belongsTo(User, { foreignKey: 'userId' });

//associate events with users that are registered to it
Event.hasMany(EventUserMap, { foreignKey: 'eventId' });
EventUserMap.belongsTo(Event, { foreignKey: 'eventId' });

// for help section to associate users and help created by them 
User.hasMany(Event, { foreignKey: 'userIdForHelp' });
Event.belongsTo(User, { foreignKey: 'userIdForHelp' });

// Requirements associations
Admin.hasMany(Requirement, { foreignKey: 'createdBy', as: 'requirements' });
Requirement.belongsTo(Admin, { foreignKey: 'createdBy', as: 'admin' });

User.hasMany(RequirementClick, { foreignKey: 'userId' });
RequirementClick.belongsTo(User, { foreignKey: 'userId' });

Requirement.hasMany(RequirementClick, { foreignKey: 'requirementId' });
RequirementClick.belongsTo(Requirement, { foreignKey: 'requirementId' });


module.exports = {
  sequelize,
  User,
  Event,
  EventUserMap,
  Admin,
  Requirement,
  RequirementClick,
  syncDB,
};
