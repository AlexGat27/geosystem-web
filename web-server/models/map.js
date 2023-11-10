const sequelize = require("./index")
const {DataTypes} = require("sequelize")

const GraphicalMapModel = sequelize.define("graphical_map",{
  district_ids: DataTypes.ARRAY,
  geometry: DataTypes.GEOMETRY,
},
{
  sequelize,
  freezeTableName: true,
  modelName: 'GraphicalMap',
});

