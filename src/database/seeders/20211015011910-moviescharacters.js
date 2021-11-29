'use strict';
let charactersMovie = [
  {
    characterId: 3,
    movieId: 1,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    characterId: 2,
    movieId: 5,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    characterId: 1,
    movieId: 2,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    characterId: 4,
    movieId: 4,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    characterId: 3,
    movieId: 3,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    characterId: 5,
    movieId: 6,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    characterId: 6,
    movieId: 6,
    createdAt: new Date,
    updatedAt:  new Date
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('CharacterMovies',charactersMovie, {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('CharacterMovies', null, {});

  }
};

