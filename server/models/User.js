const Sequelize=require("sequelize");


module.exports = sequelize.define("User",{
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
    type:Sequelize.STRING(35),
    allowNull:true
  },
  companyAddress:{
    type:Sequelize.STRING,
    allowNull:true
  },
  companyCity:{
    type:Sequelize.STRING,
    allowNull:true
  },
  companyState:{
    type:Sequelize.STRING,
    allowNull:true
  },
  password:{
    type:Sequelize.STRING(20),
    allowNull:false
  }
});
