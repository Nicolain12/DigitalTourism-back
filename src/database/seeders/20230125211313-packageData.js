'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Packages', [{
      id: 1,
      flight_id:2,
      hotel_id:2,
      price:4296,
      discount:20,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      id: 2,
      flight_id:4,
      hotel_id:4,
      price:3255,
      discount:30,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Packages', null, {});
  }
};