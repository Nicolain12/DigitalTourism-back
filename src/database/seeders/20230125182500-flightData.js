'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Flights', [{
      image: '324932-qatar.jpg',
      airline: 'Emirates Airlines',
      departure: 'Buenos Aires',
      reach: 'Qatar',
      description: 'El vuelo incluye cena y desayuno',
      departure_date: '2023-02-15',
      reach_date: '2023-03-15',
      departure_hour: '14:30:00',
      reach_hour: '01:00:00',
      cabin: 'Economy',
      price: 2000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: '495536-lasvegas.webp',
      airline: 'American Airlines',
      departure: 'Buenos Aires',
      reach: 'Las Vegas',
      description: 'El vuelo cuenta con asientos reclinables en 180 grados e incluye desayuno y almuerzo',
      departure_date: '2023-04-20',
      reach_date: '2023-05-15',
      departure_hour: '06:30:00',
      reach_hour: '14:30:00',
      cabin: 'Premium',
      price: 2500,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: 'c1cab211-orlando.webp',
      airline: 'American Airlines',
      departure: 'Buenos Aires',
      reach: 'Orlando, FL',
      description: 'El vuelo cuenta con asientos VIP reclinables en 180 grados y king size. Tambien el vuelo cuenta con almuerzo y merienda',
      departure_date: '2023-05-10',
      reach_date: '2023-05-30',
      departure_hour: '11:30:00',
      reach_hour: '19:30:30',
      cabin: 'Premium-VIP',
      price: 3000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: 'fce632fb-saopaulo.webp',
      airline: 'Aerolineas Argentinas',
      departure: 'Buenos Aires',
      reach: 'Sao Paulo',
      description: 'El vuelo cuenta con desayuno y almuerzo',
      departure_date: '2023-06-05',
      reach_date: '2023-06-25',
      departure_hour: '07:00:00',
      reach_hour: '15:00:00',
      cabin: 'Economy',
      price: 1200,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Flights', null, {});
  }
};
