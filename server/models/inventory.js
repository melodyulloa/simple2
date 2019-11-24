'use strict';
module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    product: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    category: DataTypes.STRING,
    category: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER,
    total_cost: DataTypes.INTEGER,
    sales_price: DataTypes.INTEGER,
    sales_price: DataTypes.INTEGER,
    potential_sales: DataTypes.INTEGER
  }, {});
  Inventory.associate = function(models) {
    // associations can be defined here
  };
  return Inventory;
};