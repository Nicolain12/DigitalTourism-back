'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: 'Johndoe1@',
      image: 'default.jpg',
      age: '2000-03-04',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Lionel',
      lastName: 'Messi',
      email: 'messi@campeon.com',
      password: 'Liomessi1@',
      image: 'default.jpg',
      age: '1987-24-06',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);          
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};