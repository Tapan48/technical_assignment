const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Assuming you have a separate file for database connection

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  // Add more fields as needed
});

module.exports = Product;
