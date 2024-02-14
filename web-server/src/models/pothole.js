const {potholeSequelize} = require("./index")
const {DataTypes} = require("sequelize")

const PotholeModel = potholeSequelize.define("usersPothole",{
  geometry: DataTypes.GEOMETRY('POINT'),
  countPotholes: DataTypes.INTEGER,
  pothole_class: DataTypes.INTEGER,
  picture_path: DataTypes.STRING
},
{
  potholeSequelize,
  freezeTableName: true,
  timestamps: false,
  modelName: 'Pothole',
});

potholeSequelize.sync()
.then(console.log("successful connection"))
.catch(er => console.log(er));

module.exports = {PotholeModel}