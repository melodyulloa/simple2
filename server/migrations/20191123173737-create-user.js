'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id:{
        type:Sequelize.INTEGER(11),
        allowNull:false,
        autoIncrement:true,
        primaryKey: true
      },
      firstName:{
        type:Sequelize.STRING(35),
        allowNull: false
      },
      lastName:{
        type:Sequelize.STRING(35),
        allowNull: false
      },
      email:{
        type:Sequelize.STRING,
        allowNull: false
      },
      company:{
        type:Sequelize.STRING(35)
      },
      companyAddress:{
        type:Sequelize.STRING
      },
      companyCity:{
        type:Sequelize.STRING
      },
      companyState:{
        type:Sequelize.STRING
      },
      password:{
        type:Sequelize.STRING,
        allowNull:false
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
    return queryInterface.dropTable('users');
  }
};