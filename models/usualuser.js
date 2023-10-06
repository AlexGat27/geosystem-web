const User = require("./user")

const UsualUserModel = (sequelize, Sequelize) => {
  const UsualUser = sequelize.define("usualuser",{
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    start_subscribe_time: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    final_subscribe_time: Sequelize.DATE,
    count_photos: Sequelize.INTEGER,
    bonus_balance: Sequelize.INTEGER
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'UsualUser',
  });  

  return UsualUser;
};

module.exports = UsualUserModel