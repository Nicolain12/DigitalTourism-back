'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Users', // table name
      'age', // new column name
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'age');
  }
};

