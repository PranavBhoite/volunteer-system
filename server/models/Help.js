const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Help = sequelize.define('Help', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  place: {
    type: DataTypes.STRING,
    allowNull: false
  },
  extraVolunteers: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM("approved", "disapproved"),
    defaultValue: "disapproved"
  },
  userId: {
    type: DataTypes.STRING, // Can change to UUID if your users use UUID
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'helps',
  timestamps: true // Adds createdAt and updatedAt
});

module.exports = Help;
