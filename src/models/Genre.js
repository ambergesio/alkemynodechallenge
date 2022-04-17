const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Genre extends Model {};

Genre.init({
    name:   { type: DataTypes.STRING, allowNull: false },
    image:  { type: DataTypes.STRING, allowNull: false },
    movies: { type: DataTypes.STRING, allowNull: false }
}, {
    sequelize,
    modelName: 'genre'
});

module.exports = Genre;