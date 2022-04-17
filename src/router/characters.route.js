const router = require('express').Router();
const { protectedRoute } = require('../auth');

const { getCharacterById, getCharacterByQuery, createNewCharacter, updateCharacter, deleteCharacterById } = require('../controllers/characters.controller');



// ***** obtener los personajes por query o todos ***** //
router.get('/', getCharacterByQuery);


// *********** obtener personaje por id *************** //
router.get('/:id', getCharacterById);


// *********** crear nuevo personaje ****************** //
router.post('/', protectedRoute, createNewCharacter);


// ********** actualizar personaje ******************** //
router.put('/', protectedRoute, updateCharacter);


// ************* borrar personaje por id ************** //
router.delete('/:id', protectedRoute, deleteCharacterById);


module.exports = router;