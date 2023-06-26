'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Hotels', [{
      image: ["products-1687547747761.jpeg","products-1687547747777.jpeg","products-1687547747778.jpeg"],
      name: 'Sunset resort',
      spot: 'Venezuela',
      service: 4,
      description: 'The ressort is located on margarita island and is all inclusive type. It also has private entretaiment and events',
      price: 200,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: ["products-1687547965103.jpeg","products-1687547965105.jpeg","products-1687547965108.png"],
      name: 'Sakura hotel',
      spot: 'Japan',
      service: 3,
      description: 'The hotel is located on the outskirts of tokyo which is the capital of the country',
      price: 130,
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: ["products-1687548436421.jpg","products-1687548436421.jpg","products-1687548436421.jpg"],
      name: 'Yarara',
      spot: 'Argentina',
      service: 5,
      description: 'The hotel is located in bariloche. for an additional fee on reception you can change your service for an all inclusive one',
      price: 250,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: ["products-1687548608472.jpeg","products-1687548608473.jpeg","products-1687548608475.jpg"],
      name: 'Sea views resort',
      spot: 'Dominica',
      service: 5,
      description: 'The resort is all inclusive and has a private beach ',
      price: 230,
      user_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hotels', null, {});
  }
};
