const router = require('express').Router();
const { protectedRoute } = require('../auth');

const { getMovies, createMovie, updateMovie, deleteMovie } = require('../controllers/movies.controller');


// ******** obtener todas las palículas ******** //
router.get('/', getMovies);


// ******** crear nueva palícula ******** //
router.post('/', protectedRoute, createMovie);


// ******** actualizar palícula ******** //
router.put('/', protectedRoute, updateMovie);


// ******** borrar palícula por id ******** //
router.delete('/:id', protectedRoute, deleteMovie);


module.exports = router;