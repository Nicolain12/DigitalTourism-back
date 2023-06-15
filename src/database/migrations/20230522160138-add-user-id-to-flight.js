'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Flights', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', 
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Flights', 'user_id');
  },
};
