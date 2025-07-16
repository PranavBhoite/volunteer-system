const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RequirementClick = sequelize.define('RequirementClick', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  requirementId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'requirements',
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  intendedQuantity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clickedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'requirement_clicks',
  timestamps: true,
});

module.exports = RequirementClick;
