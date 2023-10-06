const UsualUser = require("./usualuser")
const EnterpriseUser = require("./enterpriseuser")

var UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define("user",{
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    isfiz: DataTypes.BOOLEAN
  },
  {
    sequelize,
    modelName: 'User',
  });

  return User;
}

module.exports = UserModel;