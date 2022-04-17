const genreDao = require('../daos/genre.dao');

// obtener todos los generos o por id en query (?id=numero)
/**
 * @swagger
 * /api/genre?key=value:
 *   get:
 *     tags: [Genres]
 *     summary: Get a list of all genres or by id
 *     description: Get one specific genre by its id number with query param. If no query, endpoint returns a list of all genres.
 *     responses:
 *       200:
 *         description: Get a genre in json format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 movies:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 */
const getGenres = async (req, res) => {
    const { id } = req.query;
    console.log(id);
    if (id) {
        try {
            const genres = await genreDao.getById(id);
            res.status(200).json(genres);
        }
        catch (error) {
            throw error;
        }
    };
    try {
        const all = await genreDao.getAll();
        res.status(200).json(all);
    }
    catch (error) {
        throw error;
    }
};

// crear genero
/**
 * @swagger
 * /api/genre:
 *   post:
 *     tags: [Genres]
 *     summary: Create a new genre.
 *     description: NEEDS AUTHENTICATION
 *     requestBody:
 *       description: Create a new genre.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               movies:
 *                 type: string
 *     responses:
 *       201:
 *         description: Create a new genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 movies:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 */
const createGenre = async (req, res) => {
    const type = req.body;
    console.log(type);
    try{ 
        const newGenre = await genreDao.save(type);
        res.status(201).json(newGenre);
    }
    catch (error) {
        throw error;
    }
};

// actualizar genero
/**
 * @swagger
 * /api/genre:
 *   put:
 *     tags: [Genres]
 *     summary: Update an existing genre.
 *     description: NEEDS AUTHENTICATION
 *     requestBody:
 *       description: Can edit one or several values. Id number must be included.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               name:
 *                 type: string
 *               image:
 *                 type: string
 *               movies:
 *                 type: string
 *     responses:
 *       200:
 *         description:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 movies:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 */
const updateGenre = async (req, res) => {
    const genre = req.body;
    try {
        const editedGenre = await genreDao.update(genre);
        res.status(200).json(editedGenre);
    }
    catch (error) {
        throw error;
    }
};

// borrar genero por parametro id
/**
 * @swagger
 * /api/genre/:id:
 *   delete:
 *     tags: [Genres]
 *     summary: Delete a specific genre by its id.
 *     description: Delete an existing genre, sending its id number by url param. NEEDS AUTHENTICATION
 *     responses:
 *       200:
 *         description: Returns all remainig genres.
 */
const deleteGenre = async (req, res) => {
    const { id } = req.params;
    try {
        await genreDao.deleteById(id);
        const all = await genreDao.getAll();
        res.status(200).json(all);
    }
    catch (error) {
        throw error;
    }
};

module.exports = { getGenres, createGenre, updateGenre, deleteGenre };