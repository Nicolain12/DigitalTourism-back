'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Flights', [{
      image: ["products-1687547596186.jpeg","products-1687547596189.jpg","products-1687547596190.jpg"],
      airline: 'Aerolineas argentinas',
      departure: 'Argentina',
      reach: 'Brazil',
      description: 'The flight includes one meal and it has a duration of three hours',
      departure_date: '2023-10-10',
      reach_date: '2023-10-20',
      departure_hour: '14:30:00',
      reach_hour: '01:00:00',
      cabin: 'Economy',
      price: 1000,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: ["products-1687547965072.jpeg","products-1687547965073.jpeg","products-1687547965074.jpeg"],
      airline: 'Asian airlines',
      departure: 'Brazil',
      reach: 'Japan',
      description: 'The flight includes three meals and has a duration of 24 hours',
      departure_date: '2023-12-01',
      reach_date: '2023-12-30',
      departure_hour: '06:30:00',
      reach_hour: '14:30:00',
      cabin: 'Premium',
      price: 2500,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: ["products-1687548289075.jpg","products-1687548289075.jpg","products-1687548289076.jpg"],
      airline: 'Rusian airlines',
      departure: 'Spain',
      reach: 'Russia',
      description: 'The flight includes 2 meals and has a bar service for first class',
      departure_date: '2024-01-01',
      reach_date: '2023-01-15',
      departure_hour: '11:30:00',
      reach_hour: '19:30:30',
      cabin: 'Premium-VIP',
      price: 3000,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: ["products-1687548608439.jpeg","products-1687548608446.jpeg","products-1687548608447.jpg"],
      airline: 'Dominican airlines',
      departure: 'Colombia',
      reach: 'Dominica',
      description: 'The fligth includes 2 meals',
      departure_date: '2023-12-15',
      reach_date: '2023-12-30',
      departure_hour: '07:00:00',
      reach_hour: '15:00:00',
      cabin: 'Economy',
      price: 1200,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Flights', null, {});
  }
};
