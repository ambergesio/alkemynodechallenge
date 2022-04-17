const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Movies extends Model {};

Movies.init({
    image:      { type: DataTypes.STRING, allowNull: false },
    title:      { type: DataTypes.STRING, allowNull: false },
    date:       { type: DataTypes.NUMBER, allowNull: false },
    rating:     { type: DataTypes.NUMBER, allowNull: false },
    characters: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    modelName: 'movies'
});

module.exports = Movies;
