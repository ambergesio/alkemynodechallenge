const CrudContainer = require('../containers/container');
const Character = require('../models/Character');


class CharacterDao extends CrudContainer {
    constructor () {
        super(Character);
    }
    async getAllCharacters () {
        try {
            return await Character.findAll({attributes: ['name', 'image']});
        }
        catch (error) {
            throw error;
        }
    };

    async getByName (name) {
        try {
            return await Character.findOne({ where: { name: name }});
        }
        catch (err) {
            throw err;
        }
    };
    
    async getByAge (age) {
        try {
            return await Character.findAll({ where: { age: age }});
        }
        catch (err) {
            throw err;
        }
    };

    async getByWeight (weight) {
        try {
            return await Character.findAll({ where: { weight: weight }});
        }
        catch (err) {
            throw err;
        }
    };
}


const characterDao = new CharacterDao;

module.exports = characterDao;