"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const instituteController_1 = __importDefault(require("../controllers/instituteController"));
const authenticator_1 = __importDefault(require("../middleware/authenticator"));
const errorHandler_1 = __importDefault(require("../middleware/errorHandler"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
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
router.post("/login", userController_1.default.login);
router.use(authenticator_1.default);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
router.get("/user", userController_1.default.getUsers);
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     description: Adds a new user to the system.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
router.post("/user", userController_1.default.createUser);
/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: Edit a user
 *     description: Updates user information.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
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
router.put("/user/edit", userController_1.default.editUser);
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
router.put("/user/password", userController_1.default.editUserPassword);
/**
 * @swagger
 * /institute:
 *   post:
 *     summary: Create an institute
 *     description: Registers a new institute.
 *     tags: [Institutes]
 *     security:
 *       - BearerAuth: []
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
router.post("/institute", instituteController_1.default.createInstitute);
/**
 * @swagger
 * /institute/adduser:
 *   put:
 *     summary: Add a user to an institute
 *     description: Assigns an existing user to an institute.
 *     tags: [Institutes]
 *     security:
 *       - BearerAuth: []
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
router.put("/institute/adduser", instituteController_1.default.addUser);
/**
 * @swagger
 * /institute:
 *   get:
 *     summary: Get all institutes
 *     description: Retrieves a list of all institutes.
 *     tags: [Institutes]
 *     security:
 *       - BearerAuth: []
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
router.get("/institute", instituteController_1.default.getInstitutes);
/**
 * @swagger
 * /institute/edit:
 *   put:
 *     summary: Edit an institute
 *     description: Updates an institute's information.
 *     tags: [Institutes]
 *     security:
 *       - BearerAuth: []
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
router.put("/institute/edit", instituteController_1.default.editInstitute);
router.use(errorHandler_1.default);
exports.default = router;
