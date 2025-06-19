const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const EventUserMap = sequelize.define('EventUserMap', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  eventId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  isAttended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "event_user_map",
  timestamps: false // Adds createdAt and updatedAt
});

module.exports = EventUserMap;
