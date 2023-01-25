'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Hotels', [{
      image: '058889-saopaulo.jpg',
      name: 'Brigadeiro resort',
      spot: 'Sao Paulo',
      service: 4,
      description: 'El resort cuenta con desayuno incluido, pileta y salida a la playa. Tambien cuenta con entretenimiento privado, discotecas, conciertos y restaurantes',
      price: 250,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: '323243-jamaica.webp',
      name: 'Free hotel',
      spot: 'Jamaica',
      service: 5,
      description: 'El hotel cuenta con una pileta con increibles vistas, restaurantes, entretenimiento privado y desayuno incluido',
      price: 350,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: '1528494-lasvegas.jpg',
      name: 'La Victoria',
      spot: 'Las vegas',
      service: 4,
      description: 'La estadia incluye el desayuno, tiene un bingo semanal privado y se encuentra frente a uno de los mejores casinos de la zona',
      price: 300,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      image: '159222787-orlando.jpg',
      name: 'Sunset hotel',
      spot: 'Orlando',
      service: 3,
      description: 'El hotel no incluye desyuno pero cuenta con un restaurante y bar privado. Tambien cuenta con una pileta interna climatizada',
      price: 170,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hotels', null, {});
  }
};
