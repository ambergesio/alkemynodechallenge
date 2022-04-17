const router = require('express').Router();
const { protectedRoute } = require('../auth');

const { getGenres, createGenre, updateGenre, deleteGenre} = require('../controllers/genre.controller');


// ******** obtener todos los géneros ******** //
router.get('/', getGenres);


// ******** crear nuevo género ******** //
router.post('/', protectedRoute, createGenre);


// ******** actualizar género ******** //
router.put('/', protectedRoute, updateGenre);


// ******** borrar género por id ******** //
router.delete('/:id', protectedRoute, deleteGenre);


module.exports = router;