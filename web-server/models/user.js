const sequelize = require("./index")
const {DataTypes} = require("sequelize")

const UserModel = sequelize.define("user",{
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  email: DataTypes.STRING,
  isfiz: DataTypes.BOOLEAN
},
{
  sequelize,
  freezeTableName: true,
  modelName: 'User',
});
  
const UsualUserModel = sequelize.define("usualuser",{
  start_subscribe_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  final_subscribe_time: DataTypes.DATE,
  count_photos: DataTypes.INTEGER,
  bonus_balance: DataTypes.INTEGER
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  modelName: 'UsualUser',
});  

const EnterpriseUserModel = sequelize.define("enterpriseuser",{
  company: DataTypes.STRING,
  start_subscribe_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  final_subscribe_time: {
    type: DataTypes.DATE,
  },
  count_orders: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  freezeTableName: true,
  timestamps: false,
  modelName: 'EnterpriseUser',
})

UserModel.hasOne(UsualUserModel);
UsualUserModel.belongsTo(UserModel, {
  foreignKey: "userId"
});

UserModel.hasOne(EnterpriseUserModel);
EnterpriseUserModel.belongsTo(UserModel, {
  foreignKey: "userId"
});

UserModel.sync();
UsualUserModel.sync();
EnterpriseUserModel.sync();

module.exports = {UserModel, UsualUserModel, EnterpriseUserModel};