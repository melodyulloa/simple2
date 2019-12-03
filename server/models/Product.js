const Sequelize=require("sequelize");


module.exports = sequelize.define("Product",{
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
        type:Sequelize.DECIMAL,
        allowNull: false
      },
      totalCost:{
        type:Sequelize.DECIMAL,
        allowNull: false
      },
      salesPrice:{
        type:Sequelize.DECIMAL,
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
