const moviesDao = require('../daos/movies.dao');


/**
 * @swagger
 * /api/movies?key=value:
 *   get:
 *     tags: [Movies]
 *     summary: Get movies by title or date.
 *     description: Get one specific movie by its title or date, with query params. If no query, endpoint returns a list of all movies.
 *     responses:
 *       200:
 *         description: Get a character in json format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: integer
 *                 rating:
 *                   type: integer
 *                 characters:
 *                   type: string 
 */
const getMovies = async (req, res) => {
    
    if (req.query.title) {
        try {
            const title = req.query.title;
            const movieByName = await moviesDao.getByTitle(title);
            res.status(200).json(movieByName);
        }
        catch (error) {
            throw error;
        }
    };
    if (req.query.date) {
        try {
            const date = parseInt(req.query.date);
            const movieByDate = await moviesDao.getByDate(date);
            res.status(200).json(movieByDate);
        }
        catch (error) {
            throw error;
        }
    };
    try {
        const allMovies = await moviesDao.getAll();
        res.status(200).json(allMovies);
    }
    catch (error) {
        throw error;
    };
};

// crear pelicula
/**
 * @swagger
 * /api/movies:
 *   post:
 *     tags: [Movies]
 *     summary: Create a new movie.
 *     description: NEEDS AUTHENTICATION
 *     requestBody:
 *       description: Create a new movie. All values are required.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: https://disney.com/toystory.jpg 
 *               title:
 *                 type: string
 *                 example: Toy Story
 *               date:
 *                 type: integer
 *                 example: 1996
 *               rating:
 *                 type: integer
 *                 example: 5
 *               characters:
 *                 type: string 
 *                 example: Woody, Buzz, Andy, Rex, Hamm
 *     responses:
 *       201:
 *         description: Create a new movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: integer
 *                 rating:
 *                   type: integer
 *                 characters:
 *                   type: string 
 */
const createMovie = async (req, res) => {
    const movie = req.body;
    try {
        const newMovie = await moviesDao.save(movie);
        res.status(201).json(newMovie);
    }
    catch (error) {
        throw error;
    }
};

// actualizar pelicula
/**
 * @swagger
 * /api/movies:
 *   put:
 *     tags: [Movies]
 *     summary: Update an existing movie by its id.
 *     description: Id must be included in the json object. Can update one or several keys. NEEDS AUTHENTICATION
 *     requestBody:
 *       description: Can edit one or several values. Id number must be included.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               image:
 *                 type: string
 *               title:
 *                 type: string
 *               date:
 *                 type: integer
 *               rating:
 *                 type: integer
 *               characters:
 *                 type: string 
 *     responses:
 *       202:
 *         description: Update an existing movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 title:
 *                   type: string
 *                 date:
 *                   type: integer
 *                 rating:
 *                   type: integer
 *                 characters:
 *                   type: string 
 */
const updateMovie = async (req, res) => {
    const movie = req.body;
    try {
        const movieUpdated = await moviesDao.update(movie);
        res.status(202).json(movieUpdated);
    }
    catch (error) {
        throw error;
    }
};

// borrar pelicula por id
/**
 * @swagger
 * /api/movies/:id:
 *   delete:
 *     tags: [Movies]
 *     summary: Delete a specific movie by its id.
 *     description: Delete an existing character, sending its id number by url param. NEEDS AUTHENTICATION
 *     responses:
 *       200:
 *         description: Returns all remainig movies.
 */
const deleteMovie = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await moviesDao.deleteById(id);
        const all = await moviesDao.getAll();
        res.status(200).json(all);
    }
    catch (error) {
        throw error;
    }
};

module.exports = { getMovies, createMovie, updateMovie, deleteMovie };