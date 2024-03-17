const {sequelize} = require("./index")
const {DataTypes} = require("sequelize")

const UserModel = sequelize.define("user",{
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true, // Определение первичного ключа
    autoIncrement: true // Если это автоинкрементируемое поле
  },
  login: DataTypes.STRING,
  passwordHash: DataTypes.STRING,
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
  count_photos: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  count_potholes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  modelName: 'UsualUser',
});  

const EnterpriseUserModel = sequelize.define("enterpriseuser",{
  company: DataTypes.STRING,
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
  foreignKey: "userId",
  onDelete: 'CASCADE'
});

UserModel.hasOne(EnterpriseUserModel);
EnterpriseUserModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: 'CASCADE'
});

sequelize.sync()
.then(console.log("successful connection users tables"))
.catch(er => console.log(er));

module.exports = {UserModel, UsualUserModel, EnterpriseUserModel};