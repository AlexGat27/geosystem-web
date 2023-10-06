const User = require("./user")

var EnterpriseUserModel = (sequelize, Sequelize) => {
  const EnterpriseUser = sequelize.define("enterpriseuser",{
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    company_name: Sequelize.STRING,
    sector: Sequelize.STRING,
    is_subscribed: {
      type: Sequelize.BOOLEAN,
      defaultValue: false      
    },
    start_subscribe_time: {
      type: Sequelize.DATE,
      defaultValue: false
    },
    final_subscribe_time: {
      type: Sequelize.Date,
      defaultValue: false
    },
    count_orders: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    timestamps: false,
    modelName: 'EnterpriseUser',
  })

  return EnterpriseUser;
};

module.exports = EnterpriseUserModel;