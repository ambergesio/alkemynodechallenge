const router = require("express").Router();
const routerPeliculasSeries = require('./movies.route');
const routerPersonajes = require('./characters.route');
const routerGeneros = require('./genre.route');
const routerAuth = require('./auth.route');


router.use('/api/movies', routerPeliculasSeries);
router.use('/api/characters', routerPersonajes);
router.use('/api/genre', routerGeneros);
router.use('/auth', routerAuth);

router.use('*', (req, res) => {
    res.status(404).json({'error': 'not found'});
});

module.exports = router;