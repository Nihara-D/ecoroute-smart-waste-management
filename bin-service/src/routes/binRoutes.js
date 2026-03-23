const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/binController');

/**
 * @swagger
 * tags:
 *   name: Smart Bin Management
 *   description: API for managing smart waste bins and their real-time fill levels
 */

/**
 * @swagger
 * /bins:
 *   get:
 *     summary: Retrieve all registered bins
 *     tags: [Smart Bin Management]
 *     parameters:
 *       - in: query
 *         name: zone
 *         schema:
 *           type: string
 *         description: Filter by zone (e.g., Zone-A)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [general, recyclable, organic]
 *         description: Filter by waste type
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, full, empty]
 *         description: Filter by bin status
 *     responses:
 *       200:
 *         description: List of bins retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bin'
 */
router.get('/', ctrl.getAllBins);

/**
 * @swagger
 * /bins/{id}:
 *   get:
 *     summary: Get a specific bin by ID
 *     tags: [Smart Bin Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bin found
 *       404:
 *         description: Bin not found
 */
router.get('/:id', ctrl.getBinById);

/**
 * @swagger
 * /bins:
 *   post:
 *     summary: Register a new smart bin
 *     tags: [Smart Bin Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBinRequest'
 *     responses:
 *       201:
 *         description: Bin registered successfully
 *       400:
 *         description: Missing required fields
 */
router.post('/', ctrl.createBin);

/**
 * @swagger
 * /bins/{id}/update-level:
 *   post:
 *     summary: Update bin fill level (triggers threshold alert at 80%)
 *     tags: [Smart Bin Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fill_level
 *             properties:
 *               fill_level:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Current fill level percentage
 *                 example: 85
 *     responses:
 *       200:
 *         description: Fill level updated. If >= 80%, a dispatch notification is emitted.
 *       400:
 *         description: Invalid fill level
 *       404:
 *         description: Bin not found
 */
router.post('/:id/update-level', ctrl.updateFillLevel);

/**
 * @swagger
 * /bins/status/full:
 *   get:
 *     summary: Get all bins that require immediate collection (fill level >= 80%)
 *     tags: [Smart Bin Management]
 *     responses:
 *       200:
 *         description: List of full bins requiring collection
 */
router.get('/status/full', ctrl.getFullBins);

/**
 * @swagger
 * /bins/notifications/all:
 *   get:
 *     summary: Get all threshold trigger notifications
 *     tags: [Smart Bin Management]
 *     responses:
 *       200:
 *         description: List of threshold notifications sent to dispatch
 */
router.get('/notifications/all', ctrl.getNotifications);

/**
 * @swagger
 * /bins/{id}:
 *   delete:
 *     summary: Decommission (delete) a bin
 *     tags: [Smart Bin Management]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Bin deleted
 *       404:
 *         description: Bin not found
 */
router.delete('/:id', ctrl.deleteBin);

module.exports = router;
