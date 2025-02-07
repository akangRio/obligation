import { Router } from "express";
import userController from "../controllers/userController";
import instituteController from "../controllers/instituteController";
import authenticating from "../middleware/authenticator";
import errorHandler from "../middleware/errorHandler";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Users
 *     description: User management endpoints
 *   - name: Institutes
 *     description: Institute management endpoints
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", userController.login);

router.use(authenticating);

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search for users by name, email, phone, or institute name.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       400:
 *         description: Bad request
 */
router.get("/user", userController.getUsers);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/user", userController.createUser);

/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Edit a user
 *     description: Updates user information.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               instituteId:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/user/edit", userController.editUser);

/**
 * @swagger
 * /user/password:
 *   put:
 *     summary: Change user password
 *     description: Updates a user's password.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password has been changed
 *       400:
 *         description: Wrong password or invalid input
 */
router.put("/user/password", userController.editUserPassword);

/**
 * @swagger
 * /institute:
 *   post:
 *     summary: Create an institute
 *     description: Registers a new institute.
 *     tags: [Institutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               instituteType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Institute created successfully
 */
router.post("/institute", instituteController.createInstitute);

/**
 * @swagger
 * /institute/adduser:
 *   put:
 *     summary: Add a user to an institute
 *     description: Assigns an existing user to an institute.
 *     tags: [Institutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added successfully
 */
router.put("/institute/adduser", instituteController.addUser);

/**
 * @swagger
 * /institute:
 *   get:
 *     summary: Get all institutes
 *     description: Retrieves a list of all institutes.
 *     tags: [Institutes]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get("/institute", instituteController.getInstitutes);

/**
 * @swagger
 * /institute/edit:
 *   put:
 *     summary: Edit an institute
 *     description: Updates an institute's information.
 *     tags: [Institutes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               instituteType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Institute updated successfully
 */
router.put("/institute/edit", instituteController.editInstitute);

router.use(errorHandler);

export default router;
