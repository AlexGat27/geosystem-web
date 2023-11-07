const sequelize = require("./index")
const {DataTypes} = require("sequelize")

const PotholeModel = sequelize.define("pothole",{
  picture_address: DataTypes.STRING,
  geometry: DataTypes.GEOMETRY,
},
{
  sequelize,
  freezeTableName: true,
  modelName: 'Pothole',
});

const DistrictModel = sequelize.define("district",{
    district_name: DataTypes.STRING,
    square: DataTypes.FLOAT,
    bonus_price: DataTypes.INTEGER
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'District',
});

const ClassPotholeModel = sequelize.define("pothole_class",{
    class_name: DataTypes.STRING,
    description: DataTypes.STRING,
    danger_degree: DataTypes.INTEGER
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Pothole_class',
});

PotholeModel.hasMany(DistrictModel, {
    foreignKey: "district_id"
});
DistrictModel.belongsTo(PotholeModel);

PotholeModel.hasMany(ClassPotholeModel, {
    foreignKey: "class_id"
});
ClassPotholeModel.belongsTo(PotholeModel);