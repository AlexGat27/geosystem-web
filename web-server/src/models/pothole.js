const {potholeSequelize} = require("./index")
const {DataTypes} = require("sequelize")

const PotholeModel = potholeSequelize.define("pothole",{
  // picture_address: DataTypes.STRING,
  geometry: DataTypes.GEOMETRY,
  adress: DataTypes.STRING,
  pothole_class: DataTypes.INTEGER
},
{
  potholeSequelize,
  freezeTableName: true,
  timestamps: false,
  modelName: 'Pothole',
});//

// const DistrictModel = potholeSequelize.define("district",{
//     district_name: DataTypes.STRING,
//     square: DataTypes.FLOAT,
//     bonus_price: DataTypes.INTEGER
//   },
//   {
//     potholeSequelize,
//     timestamps: false,
//     freezeTableName: true,
//     modelName: 'District',
// });

// const ClassPotholeModel = potholeSequelize.define("pothole_class",{
//     class_name: DataTypes.STRING,
//     description: DataTypes.STRING,
//     danger_degree: DataTypes.INTEGER
//   },
//   {
//     potholeSequelize,
//     timestamps: false,
//     freezeTableName: true,
//     modelName: 'Pothole_class',
// });

// PotholeModel.hasMany(DistrictModel, {
//     foreignKey: "district_id"
// });
// DistrictModel.belongsTo(PotholeModel);

// PotholeModel.hasMany(ClassPotholeModel, {
//     foreignKey: "class_id"
// });
// ClassPotholeModel.belongsTo(PotholeModel);

potholeSequelize.sync()
.then(console.log("successful connection"))
.catch(er => console.log(er));

module.exports = {PotholeModel}