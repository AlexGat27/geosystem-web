const {sequelize} = require("./index") //Подключение к БД
const {DataTypes} = require("sequelize") //Класс типов данных sequelize
const {UserModel} = require("./user") //Модель пользователя

//Модель ям
const PotholeModel = sequelize.define("usersPothole",{
  geometry: DataTypes.GEOMETRY('POINT'),
  countPotholes: DataTypes.INTEGER,
  picture_path: DataTypes.STRING
},
{
  sequelize,
  freezeTableName: true,
  timestamps: false,
  modelName: 'Pothole',
});

UserModel.hasMany(PotholeModel);
PotholeModel.belongsTo(UserModel, {
  foreignKey: "userId",
  onDelete: 'CASCADE'
});

sequelize.sync()
.then(console.log("successful connection pothole tables"))
.catch(er => console.log(er));

module.exports = {PotholeModel}