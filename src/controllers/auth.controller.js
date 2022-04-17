const jwt = require('jsonwebtoken');
const bCrypt = require('bcryptjs');
const usersDao = require('../daos/users.dao');
const config = require('../config');

/**
 * @swagger
 * components:
 *   schemas:
 *     user:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         email:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         password:
 *           type: string
 *     character:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         image:
 *           type: string
 *         name:
 *           type: string
 *         age:
 *           type: string
 *         weight:
 *           type: string
 *         movies:
 *           type: string
 *     movie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         image:
 *           type: string
 *         title:
 *           type: string
 *         date:
 *           type: integer
 *         rating:
 *           type: integer
 *         characters:
 *           type: string
 *     genre:
 *       type: object
 *       properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          image:
 *            type: string
 *          movies:
 *            type: string
 * 
 */

// ***********************  POST LOGIN  ************************ //

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login with email and password credentials.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@gmail.com
 *               password:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: usuario logueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       401:
 *         description: El usuario no existe / Contraseña incorrecta
 */
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await usersDao.getByEmail(email);

        if (!usuario) {
            return res.status(401).json({ "error": true, "msg": "El usuario no existe"});
        }
        
        const comparePasswords = await bCrypt.compare(password, usuario.password);
        if (!comparePasswords) {
            return res.status(401).json({"error": true, "msg": "Contraseña incorrecta"});
        }
        
        let token = jwt.sign({
            email: usuario.email,
            firstName: usuario.firstName,
            lastName: usuario.lastName
        }, config.secret);
        
        res.cookie("auth-token", token, { httpOnly: true });
        res.status(200).json({"msg": "usuario logueado correctamente"});
    }
    catch (error) {
        throw error;
    }
};


// *********************** POST REGISTER ************************* //
/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: New user registration.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: johnsmith@gmail.com
 *               firstName:
 *                 type: string
 *                 example: John
 *               lastName:
 *                 type: string
 *                 example: Smith
 *               password:
 *                 type: string
 *                 example: pass1234
 *               confirmPassword:
 *                 type: string
 *                 example: pass1234
 *     responses:
 *       200:
 *         description: Usuario creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 password:
 *                   type: string
 *                 confirmPassword:
 *                   type: string
 *       400:
 *         description: Error de datos ingresados
 *         401:
 *           description: Usuario creado con éxito
 */
const register = async (req, res) => {
    const { email, firstName, lastName, password, confirmPassword } = req.body;

    if (email == null || email == undefined) return res.status(400).json({"msg": "falta el email"});
    if (firstName == null || firstName == undefined ) return res.status(400).json({"msg": "falta el nombre"});
    if (lastName == null || lastName == undefined ) return res.status(400).json({"msg": "falta el apellido"});
    if (password == null || password == undefined ) return res.status(400).json({"msg": "falta la constraseña"});
    if (confirmPassword == null || confirmPassword == undefined ) return res.status(400).json({"msg": "falta confirmar la constraseña"});
    try {
        const usuario = await usersDao.getByEmail(email);
        if (usuario) return res.status(401).json({"error": true, "msg": "El usuario ya existe"});
        
        const salt = await bCrypt.genSalt(10);
        const hashedPass = await bCrypt.hash(password, salt);
        const user = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPass,
        }
        await usersDao.save(user);       
        return res.status(200).json({"msg": `Usuario creado con éxito. Nombre: ${user.firstName} ${user.lastName}. Email: ${user.email}. Debe loguearse para ingresar.`});
    }
    catch (error) {
        throw error;
    }
};


// ***********************  LOGOUT  *************************** //

const logout = (req, res) => {
    res.clearCookie('auth-token', { httpOnly: true });
    res.status(200).json({ "msg": "Sesión cerrada correctamente"});
};


module.exports = { login, register,  logout };
