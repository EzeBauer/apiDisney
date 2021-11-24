'use strict';
let genres = [
  {
    name : "acción",
    image:"icons8-acción-50.png",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    name : "animación",
    image:"icons8-animación-30.png",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    name : "aventura",
    image:"icons8-aventura-48.png",
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    name : "drama",
    image:"icons8-drama-16.png",
    createdAt: new Date,
    updatedAt:  new Date
  }
]

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Genres',genres, {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Genres', null, {});

  }
};
