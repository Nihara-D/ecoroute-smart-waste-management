const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/dispatchController');

/**
 * @swagger
 * tags:
 *   name: Logistics & Dispatch
 *   description: Fleet management and route optimization for waste collection
 */

/**
 * @swagger
 * /tasks/active:
 *   get:
 *     summary: Get all active collection tasks
 *     tags: [Logistics & Dispatch]
 *     responses:
 *       200:
 *         description: List of active tasks
 */
router.get('/tasks/active', ctrl.getActiveTasks);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks (active + completed)
 *     tags: [Logistics & Dispatch]
 *     responses:
 *       200:
 *         description: All tasks
 */
router.get('/tasks', ctrl.getAllTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID
 *     tags: [Logistics & Dispatch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */
router.get('/tasks/:id', ctrl.getTaskById);

/**
 * @swagger
 * /tasks/{id}/complete:
 *   put:
 *     summary: Mark a collection task as completed
 *     tags: [Logistics & Dispatch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID to complete
 *     responses:
 *       200:
 *         description: Task completed, truck freed
 *       404:
 *         description: Task not found
 */
router.put('/tasks/:id/complete', ctrl.completeTask);

/**
 * @swagger
 * /dispatch/assign:
 *   post:
 *     summary: Assign collection task to nearest available truck (route optimization)
 *     tags: [Logistics & Dispatch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bins
 *             properties:
 *               bins:
 *                 type: array
 *                 description: List of full bins to collect
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: bin-001
 *                     fill_level:
 *                       type: number
 *                       example: 85
 *                     location:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                           example: 6.9271
 *                         lng:
 *                           type: number
 *                           example: 79.8612
 *                         address:
 *                           type: string
 *                           example: 45 Main Street, Colombo 01
 *               notes:
 *                 type: string
 *                 example: Urgent collection - bins over 90%
 *     responses:
 *       201:
 *         description: Task assigned with route optimization
 *       400:
 *         description: Missing bins data
 *       503:
 *         description: No trucks available
 */
router.post('/dispatch/assign', ctrl.assignDispatch);

/**
 * @swagger
 * /trucks:
 *   get:
 *     summary: Get fleet status and all trucks
 *     tags: [Logistics & Dispatch]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [available, on-route, maintenance]
 *         description: Filter by truck status
 *     responses:
 *       200:
 *         description: Fleet details with summary
 */
router.get('/trucks', ctrl.getAllTrucks);

/**
 * @swagger
 * /trucks/fleet-status:
 *   get:
 *     summary: Get fleet availability summary
 *     tags: [Logistics & Dispatch]
 *     responses:
 *       200:
 *         description: Fleet status summary
 */
router.get('/trucks/fleet-status', ctrl.getFleetStatus);

module.exports = router;
