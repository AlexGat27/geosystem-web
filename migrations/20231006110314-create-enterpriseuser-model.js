'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('enterpriseuser', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',  // Имя связанной таблицы
          key: 'id',        // Поле, с которым будет связан внешний ключ
        }
      },
      company_name: Sequelize.STRING,
      sector: Sequelize.STRING,
      is_subscribed: Sequelize.BOOLEAN,
      start_subscribe_time: Sequelize.DATE,
      final_subscribe_time: Sequelize.DATE,
      count_orders: Sequelize.INTEGER,
    });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('enterpriseuser');
  }
};
