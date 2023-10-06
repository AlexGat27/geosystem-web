
module.exports = (sequelize, DataTypes) => {
  const EnterpriseUserModel = sequelize.define("enterpriseuser",{
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    company_name: DataTypes.STRING,
    sector: DataTypes.STRING,
    is_subscribed: DataTypes.BOOLEAN,
    start_subscribe_time: DataTypes.DATE,
    final_subscribe_time: DataTypes.DATE,
    count_orders: DataTypes.INTEGER,
  }, {
    sequelize,
    timestamps: false,
    modelName: 'EnterpriseUserModel',
  })

  EnterpriseUserModel.associate = (models) => {
    EnterpriseUserModel.belongsTo(models.User);
  }

  return EnterpriseUserModel;
};