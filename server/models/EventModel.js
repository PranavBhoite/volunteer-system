const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Event = sequelize.define('Event', {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [1, 100],
        msg: 'Title cannot exceed 100 characters',
      },
    },
  },
  description: {
    type: DataTypes.STRING(1000),
    validate: {
      len: {
        args: [0, 1000],
        msg: 'Description cannot exceed 1000 characters',
      },
    },
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    trim: true,
  },
  category: {
    type: DataTypes.STRING,
  },
  volunteersNeeded: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  volunteersRegistered: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  volunteers: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  tableName: 'events',
  timestamps: false, // or true if you want `createdAt` and `updatedAt`
});

module.exports = Event;
