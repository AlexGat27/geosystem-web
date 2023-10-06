'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('usualuser', {
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
          key: 'id', // Поле, с которым будет связан внешний ключ,
        }
      },
      start_subscribe_time: Sequelize.DATE,
      final_subscribe_time: Sequelize.DATE,
      count_photos: Sequelize.INTEGER,
      bonus_balance: Sequelize.INTEGER,
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('usualuser');
  }
};
