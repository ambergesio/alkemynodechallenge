const characterDao = require('../daos/character.dao');


// obtener personaje por id
/**
 * @swagger
 * /api/characters/:id:
 *   get:
 *     tags: [Characters]
 *     summary: Get character by id
 *     description: Get one specific character by its id number from url param
 *     responses:
 *       200:
 *         description: A character in json format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 weight:
 *                   type: integer
 *                 movies:
 *                   type: string 
 */
const getCharacterById = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const character = await characterDao.getById(id);
        res.status(200).json(character);
    }
    catch (error) {
        throw error;
    }
};

//obtener personaje por query
/**
 * @swagger
 * /api/characters?key=value:
 *   get:
 *     tags: [Characters]
 *     summary: Get character by name, age, weight
 *     description: Get one specific character by its name, age or weight, with query params. If no query, endpoint returns a list of all character's name and image.
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
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 weight:
 *                   type: integer
 *                 movies:
 *                   type: string 
 */
const getCharacterByQuery = async (req, res) => {
    const { name, age, weight } = req.query;

    // query por nombre
    if (name){
        try {
            const character = await characterDao.getByName(name);
            res.status(200).json(character);
        }
        catch (error) {
            throw error;
        }
    };
    //query por edad
    if (age){
        try {
            const character = await characterDao.getByAge(age);
            res.status(200).json(character);
        }
        catch (error) {
            throw error;
        }
    };
    // query poer peso
    if (weight){
        try {
            const character = await characterDao.getByWeight(weight);
            res.status(200).json(character);
        }
        catch (error) {
            throw error;
        }
    };

    // si no hay query params, por default se obtienen todos los personajes
    try {
        const all = await characterDao.getAllCharacters();
        res.status(200).json(all);
    }
    catch (error) {
        throw error;
    }
};

// crea nuevo personaje
/**
 * @swagger
 * /api/characters:
 *   post:
 *     tags: [Characters]
 *     summary: Create a new character. All vlues are required
 *     description: Create a new character sending a json object. NEEDS AUTHENTICATION.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 example: https://disney.com/luke.jpg
 *               name:
 *                 type: string
 *                 example: Luke Skywalker
 *               age:
 *                 type: integer
 *                 example: 19
 *               weight:
 *                 type: integer
 *                 example: 130
 *               movies:
 *                 type: string 
 *                 example: A new hope, Return of the Jedi
 *     responses:
 *       201:
 *         description: Create a new character in json format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 weight:
 *                   type: integer
 *                 movies:
 *                   type: string 
 */
const createNewCharacter = async (req, res) => {
    const newCharacter = req.body;
    try{
        const newCharacterSaved = await characterDao.save(newCharacter);
        res.status(201).json(newCharacterSaved);
    }
    catch (error) {
        throw error;
    }
};

// actualiza un personaje
/**
 * @swagger
 * /api/characters:
 *   put:
 *     tags: [Characters]
 *     summary: Update a specific character by its id.
 *     description: Update an existing character, sending a json object. Id must be sent inside the json object. NEEDS AUTHENTICATION
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               movies:
 *                 type: string 
 *                 example: Fantasy, Steamboat Willie
 *     responses:
 *       200:
 *         description: Character updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 image:
 *                   type: string
 *                 name:
 *                   type: string
 *                 age:
 *                   type: integer
 *                 weight:
 *                   type: integer
 *                 movies:
 *                   type: string 
 */
const updateCharacter = async (req, res) => {
    try {
        const character = req.body;
        const updated = await characterDao.update(character);
        res.status(200).json(updated);
    }
    catch (error) {
        throw error;
    }
};

//borra personaje por id
/**
 * @swagger
 * /api/characters/:id:
 *   delete:
 *     tags: [Characters]
 *     summary: Delete a specific character by its id.
 *     description: Delete an existing character, sending its id number by url param. NEEDS AUTHENTICATION
 *     responses:
 *       200:
 *         description: Returns all remainig characters.
 */
const deleteCharacterById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await characterDao.deleteById(id);
        const all = await characterDao.getAll();
        res.status(200).json(all);
    }
    catch (error) {
        throw error;
    }
}

module.exports = { getCharacterById, getCharacterByQuery, createNewCharacter, updateCharacter, deleteCharacterById };