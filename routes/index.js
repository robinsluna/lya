const express = require('express')
const router = express.Router()

const users = require('../controllers/users');
const auth = require('../controllers/auth');
const { isAuthenticatedMiddleware } = require("../middleware/auth");


/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: correo electronico del usuario.
 *           example: andrea@gmail.com
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: nombre del usuario.
 *           example: Andrea 
 *         lastname:
 *           type: string
 *           description: apellido del usuario.
 *           example: Vela
 *         email:
 *           type: string
 *           description: correo electronico del usuario.
 *           example: andrea@gmail.com
 *         active:
 *           type: boolean
 *           description: usuario activo.
 *           example: false
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: string
 *               description: id del usuario
 *               example: 0000x00
 *         - $ref: '#/components/schemas/NewUser'
 * 
 */


/**
 * @swagger
 * /users:
 *   get:
 *     description: Retorna una lista de usuarios
 *     responses:
 *       200:
 *         description: una lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users', users.index);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     security:
 *      - jwt: []  
 *     description: Obtiene la información del usuario (si está activo).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del usuario 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: un usuario
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/users/:id', isAuthenticatedMiddleware, users.show);

/**
 * @swagger
 * /users:
 *   post:
 *     description: "Crea un nuevo usuario en la base de datos. El usuario es creado con un estado {active: false}, responde con ID de usuario creado."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: un usuario
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.post('/users', users.create);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     security:
 *      - jwt: []  
 *     description: Actualiza la información del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del usuario 
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       200:
 *         description: un usuario
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.put('/users/:id', isAuthenticatedMiddleware, users.update);



/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     security:
 *      - jwt: []   
 *     description: Borra un usuario de la base de datos.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del usuario 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: usuario borrado
 */
router.delete('/users/:id', isAuthenticatedMiddleware, users.delete);


/**
 * @swagger
 * /users/{id}/active:
 *   patch:
 *     security:
 *      - jwt: []  
 *     description: Activa la cuenta del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: id del usuario 
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: un usuario
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 */
router.patch('/users/:id/active', isAuthenticatedMiddleware, users.activate);




/**
 * @swagger
 * /authorization:
 *   post:
 *     description: Obtiene un token de autorización tipo JWT para el usuario solicitado (inicia sesión).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: autenticacion exitosa
 */
router.post('/authorization', auth.create);


/**
 * @swagger
 * /authorization:
 *   delete:
 *     security:
 *      - jwt: []   
 *     description: Elimina el token de autorización para el usuario solicitado (cierra sesión).
 *     responses:
 *       200:
 *         description: autenticacion exitosa
 */
router.delete('/authorization', isAuthenticatedMiddleware, auth.delete);


module.exports = router;