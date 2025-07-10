const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * User Model Definition
 *
 * This model defines the schema for the 'users' table in the database.
 * It includes fields for user details, credentials, and the newly added
 * virtualId and interests fields.
 */
const User = sequelize.define('User', {
  // Standard UUID for the primary key
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  // virtualId is now generated in the controller before creation
  virtualId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,
  },
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
  interests: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  type: {
    type: DataTypes.ENUM("Volunteer", "Intern", "Field Worker", "Other"),
    defaultValue: "Volunteer"
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'disapproved'),
    defaultValue: 'pending',
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'users',
  timestamps: false, // Disabling createdAt/updatedAt columns
});

module.exports = User;
