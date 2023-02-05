'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Packages', [{
      flight_id:4,
      hotel_id:1,
      price:4960,
      discount:20,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      flight_id:3,
      hotel_id:4,
      price:4480,
      discount:30,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      flight_id:2,
      hotel_id:3,
      price:13400,
      discount:15,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Packages', null, {});
  }
};