// models/loan-model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Loan = sequelize.define('Loan', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  tenure: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Loan', // Ensure the table name matches your actual MySQL table name
  timestamps: false, // Disable timestamps (createdAt and updatedAt)
});

module.exports = Loan;
