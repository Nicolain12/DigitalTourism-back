'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      airline: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure: {
        allowNull: false,
        type: Sequelize.STRING
      },
      reach: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      departure_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      reach_date: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      departure_hour: {
        allowNull: false,
        type: Sequelize.TIME
      },
      reach_hour: {
        allowNull: false,
        type: Sequelize.TIME
      },
      cabin: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Flights');
  }
};