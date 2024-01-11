// models/payment-model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection');

const Payment = sequelize.define('Payment', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  paid_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, // Assuming the default status is not paid
  },
  time: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW, // Assuming the default value is the current timestamp
  },
}, {
  tableName: 'Payment', // Ensure the table name matches your actual MySQL table name
  timestamps: false, // Disable timestamps (createdAt and updatedAt)
});

module.exports = Payment;
