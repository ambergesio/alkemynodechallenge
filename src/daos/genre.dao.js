const CrudContainer = require('../containers/container');
const Genre = require('../models/Genre');

class GenreDao extends CrudContainer {
    constructor() {
        super(Genre);
    }
}

const genreDao = new GenreDao;

module.exports = genreDao;