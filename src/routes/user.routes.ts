import {Router} from 'express';

import { register,login,getProfile } from '../controllers/user.controller';

import {authenticate} from '../middleware/auth.middleware';

const router=Router();

/**
 *  @swagger
 * /api/users/register:
 *   post:
 *   summary: Register a new customer
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *    application/json:
 *     schema:
 *     type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *        properties:
 *         name:
 *         type: string
 *         example:Habiba
 *          email:
 *          type: string
 *           example:habiba@example.com
 *           password:
 *             type: string
 *           example: Password124
 *     responses:
 *       201:
 *      description: User registered successfully
 *       400:
 *   description: Validation error or Email already exists
 */


router.post('/register' , register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *  summary: User login
 *  tags:[Users]
 *   requestBody:
 *   required: true
 *   content:
 *    application/json:
 *     schema:
 *     type: object
 *     required:
 *      - email
 *      - password
 *      properties:
 *       email :
 *       type : string
 *       example: habiba@example.com
 *       password:
 *     type: string
 *     example:Password123
 *     responses:
 *       200:
 *     description: Login successful and returns token
 *     400:
 *    description: Invalid credentials
 */
router.post('/login' , login);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 * 
 *  summary: Get logged-in user profile
 *   tags: [Users]
 *   security:
 *   - bearerAuth:[]
 *     responses:
 *       200:
 *       description: Profile retrieved successfully
 *       401:
 *      description: Unauthorized - Invalid or missing token
 * 
 */
router.get('/profile' , authenticate , getProfile);

export default router ;