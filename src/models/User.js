const { Model, DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

class User extends Model {};

User.init({
    email:     { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName:  { type: DataTypes.STRING, allowNull: false },
    password:  { type: DataTypes.STRING, allowNull: false },
}, {
    sequelize,
    modelName: 'user'
});

module.exports = User;