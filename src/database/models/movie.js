'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Movie.belongsTo(models.Genre, {
         as: "genre",
         foreignKey: "genreId",
         onDelete: "cascade",
         onUpdate: "cascade",
       });
       Movie.belongsToMany(models.Character, {
         as: "characters",
         through: "characterMovies",
         foreignKey: "movieId",
         otherKey: "characterId",
         onDelete: "cascade",
         onUpdate: "cascade",
       });
    }
  };
  Movie.init({
    image: DataTypes.STRING,
    title: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    rating: DataTypes.DECIMAL,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};