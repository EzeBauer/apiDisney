'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Character.belongsToMany(models.Movie, {
        as: "movies",
        through: "characterMovies",
        foreignKey: "characterId",
        otherKey: "movieId",
        onDelete: "cascade",
        onUpdate: "cascade",
      });
    }
  };
  Character.init({
    image: DataTypes.STRING(100),
    name: DataTypes.STRING(50),
    age: DataTypes.INTEGER,
    weight: DataTypes.DECIMAL(5, 3),
    history: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};