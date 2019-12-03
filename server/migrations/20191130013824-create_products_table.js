'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
      },
      userId:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product:{
        type:Sequelize.STRING,
        allowNull: false
      },
      category:{
        type:Sequelize.STRING,
        allowNull: false
      },
      quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
      },
      cost:{
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      totalCost:{
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      salesPrice:{
        type:Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
