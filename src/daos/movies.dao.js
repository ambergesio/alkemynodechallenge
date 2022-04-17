const CrudContainer = require("../containers/container");
const Movies = require('../models/Movies');

class MoviesDao extends CrudContainer {
    constructor() {
        super(Movies)
    }
    async getByTitle (title) {
        try {
            return await Movies.findOne({ where: { title: title } });
        }
        catch (error) {
            throw error;
        }
    }
    async getByDate (date) {
        try {
            return await Movies.findAll({ where: { date: date } });
        }
        catch (error) {
            throw error;
        }
    }
};

const moviesDao = new MoviesDao;

module.exports = moviesDao;