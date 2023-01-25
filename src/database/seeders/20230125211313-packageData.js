'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Packages', [{
      flight_id:4,
      hotel_id:1,
      price:6200,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      flight_id:3,
      hotel_id:4,
      price:6400,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      flight_id:2,
      hotel_id:3,
      price:13400,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Packages', null, {});
  }
};