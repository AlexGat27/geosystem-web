const {userSequelize} = require("./index")
const {DataTypes} = require("sequelize")

const UserModel = userSequelize.define("user",{
  login: DataTypes.STRING,
  password: DataTypes.STRING,
  phone_number: DataTypes.STRING,
  email: DataTypes.STRING,
  isfiz: DataTypes.BOOLEAN
},
{
  userSequelize,
  freezeTableName: true,
  modelName: 'User',
});
  
const UsualUserModel = userSequelize.define("usualuser",{
  start_subscribe_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  final_subscribe_time: DataTypes.DATE,
  count_photos: DataTypes.INTEGER,
  bonus_balance: DataTypes.INTEGER
},
{
  userSequelize,
  timestamps: false,
  freezeTableName: true,
  modelName: 'UsualUser',
});  

const EnterpriseUserModel = userSequelize.define("enterpriseuser",{
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
  userSequelize,
  freezeTableName: true,
  timestamps: false,
  modelName: 'EnterpriseUser',
})

UserModel.hasOne(UsualUserModel);
UsualUserModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: 'CASCADE'
});

UserModel.hasOne(EnterpriseUserModel);
EnterpriseUserModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: 'CASCADE'
});

userSequelize.sync()
.then(console.log("successful connection"))
.catch(er => console.log(er));

module.exports = {UserModel, UsualUserModel, EnterpriseUserModel};