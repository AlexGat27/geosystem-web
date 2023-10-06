
module.exports = (sequelize, DataTypes) => {
  const UsualUserModel = sequelize.define("usualuser",{
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    start_subscribe_time: DataTypes.DATE,
    final_subscribe_time: DataTypes.DATE,
    count_photos: DataTypes.INTEGER,
    bonus_balance: DataTypes.INTEGER
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'UsualUser',
  });  
  UsualUserModel.associate = (models) => {
    UsualUserModel.belongsTo(models.User);
  }

  return UsualUserModel;
};