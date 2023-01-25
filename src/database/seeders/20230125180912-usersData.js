'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      password: '123',
      image: 'default.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Nicolas',
      lastName: 'Lain',
      email: 'nico@mail.com',
      password: '456',
      image: 'default.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Victoria',
      lastName: 'Valbuena',
      email: 'vicky@mail.com',
      password: '789',
      image: 'default.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'Lionel',
      lastName: 'Messi',
      email: 'messi@campeon.com',
      password: '321',
      image: 'default.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);          
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};