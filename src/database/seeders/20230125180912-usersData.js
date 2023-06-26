'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'Nicolas',
      lastName: 'Lain',
      email: 'nicolas@mail.com ',
      password: '$2a$10$2Q4jJKJnTT4bxjCPuYuYbOz7hVQzWe/.tJY9fY4EcqIbpaGURExqu',
      image: 'default.jpg',
      age: '2002-10-12',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      firstName: 'React',
      lastName: 'Test',
      email: 'react@test.com',
      password: '$2a$10$H8VnhEq2F07ayCGBOZhu2uTOSH6WcarPJ22gaKhAqOPig4YyBK8bu',
      image: 'default.jpg',
      age: '2002-10-12',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);          
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};