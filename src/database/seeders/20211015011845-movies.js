'use strict';
let movies = [
  {
    title : "Black Widow",
    image:"Black-Widow.webp",
    releaseDate:"2021/06/9",
    rating:5,
    genreId:1,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Cruella",
    image:"cruella.jpg",
    releaseDate:"2021/05/28",
    rating:4,
    genreId:4,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "The Avengers",
    image:"vengadores.jpeg",
    releaseDate:"2018/04/26", 
    rating:5,
    genreId:1,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Raya y el último dragón",
    image:"raya.jpg",
    releaseDate:"2021/03/5",
    rating:3,
    genreId:2,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Jungle Cruise",
    image:"junglecruise_2cta-post_vertical_ffb460da.webp",
    releaseDate:"2021/07/30",
    rating:3,
    genreId:3,
    createdAt: new Date,
    updatedAt:  new Date
  },
  {
    title : "Piratas del Caribe",
    image:"Piratas_del_Caribe.jpg",
    releaseDate:"2019/07/30",
    rating:5,
    genreId:3,
    createdAt: new Date,
    updatedAt:  new Date
  }
]
module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Movies',movies, {});
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Movies', null, {});

  }
};
