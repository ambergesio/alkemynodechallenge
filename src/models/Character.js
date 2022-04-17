const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class Character extends Model {};

Character.init({
    image:  { type: DataTypes.STRING, allowNull: false },
    name:   { type: DataTypes.STRING, allowNull: false },
    age:    { type: DataTypes.NUMBER, allowNull: false },
    weight: { type: DataTypes.NUMBER, allowNull: false },
    movies: { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize,
    modelName: 'character'
});

module.exports = Character;