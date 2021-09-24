const express = require('express')
const jwt = require("express-jwt");
const router = express.Router()

const users = require('../controllers/users');

/**
 * @swagger
 * components:
 *   schemas:
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
 *     description: Retorna un usario por su id
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
router.get('/users/:id', users.show);

/**
 * @swagger
 * /users:
 *   post:
 *     description: Crea un usuario
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
 *     description: Crea un usuario
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
router.put('/users/:id', users.update);


/**
 * @swagger
 * /users/{id}/active:
 *   patch:
 *     description: Crea un usuario
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
router.patch('/users/:id/active', users.activate);

module.exports = router;