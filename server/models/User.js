const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  mobileNo: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'active',
  },
  registeredEvents: {
    type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL array
    defaultValue: [],
  },
  completedEvents: {
    type: DataTypes.ARRAY(DataTypes.STRING), // PostgreSQL array
    defaultValue: [],
  },
}, {
  tableName: 'users',
  timestamps: false, // or true if you want createdAt/updatedAt
});

module.exports = User;
