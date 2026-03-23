const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ewasteController');

/**
 * @swagger
 * tags:
 *   name: Hazardous & E-Waste Tracker
 *   description: Lifecycle tracking of hazardous and electronic waste with compliance audit log
 */

/**
 * @swagger
 * /ewaste/log:
 *   post:
 *     summary: Log a new hazardous or electronic waste item
 *     tags: [Hazardous & E-Waste Tracker]
 *     description: |
 *       Logs hazardous/electronic waste and **auto-routes** it to the appropriate specialized processing center.
 *       Automatically creates audit entries for full environmental compliance.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [waste_type, item_description, weight_kg, source]
 *             properties:
 *               waste_type:
 *                 type: string
 *                 enum: [electronic, battery, lead_acid, lithium, chemical, industrial_chemical, pesticide, medical, pharmaceutical, biological, electrical_appliance]
 *                 example: electronic
 *               item_description:
 *                 type: string
 *                 example: Laptop Computer - HP ProBook (5 units)
 *               quantity:
 *                 type: integer
 *                 example: 5
 *               unit:
 *                 type: string
 *                 example: units
 *               weight_kg:
 *                 type: number
 *                 example: 12.5
 *               hazard_level:
 *                 type: string
 *                 enum: [low, medium, high, critical]
 *                 example: medium
 *               source:
 *                 type: object
 *                 properties:
 *                   type:
 *                     type: string
 *                     enum: [individual, corporate, government, medical_facility]
 *                     example: corporate
 *                   name:
 *                     type: string
 *                     example: ABC Company Ltd.
 *                   contact:
 *                     type: string
 *                     example: info@abc.lk
 *                   address:
 *                     type: string
 *                     example: No. 10, Galle Road, Colombo 03
 *               compliance_notes:
 *                 type: string
 *                 example: Hard drives sanitized per DoD 5220.22-M standard
 *               logged_by:
 *                 type: string
 *                 example: Officer Suresh
 *     responses:
 *       201:
 *         description: E-Waste logged with tracking code and auto-assigned center
 *       400:
 *         description: Missing required fields
 */
router.post('/ewaste/log', ctrl.logEwaste);

/**
 * @swagger
 * /ewaste:
 *   get:
 *     summary: Get all e-waste logs
 *     tags: [Hazardous & E-Waste Tracker]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [logged, in-transit, received, processing, processed, disposed]
 *       - in: query
 *         name: waste_type
 *         schema:
 *           type: string
 *       - in: query
 *         name: hazard_level
 *         schema:
 *           type: string
 *           enum: [low, medium, high, critical]
 *     responses:
 *       200:
 *         description: E-waste logs with optional filters
 */
router.get('/ewaste', ctrl.getAllLogs);

/**
 * @swagger
 * /ewaste/{id}:
 *   get:
 *     summary: Get specific e-waste log by ID or tracking code
 *     tags: [Hazardous & E-Waste Tracker]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: EW-2026-001
 *     responses:
 *       200:
 *         description: E-waste log details
 *       404:
 *         description: Log not found
 */
router.get('/ewaste/:id', ctrl.getLogById);

/**
 * @swagger
 * /ewaste/{id}/status:
 *   put:
 *     summary: Update e-waste item status (creates audit entry)
 *     tags: [Hazardous & E-Waste Tracker]
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
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [logged, in-transit, received, processing, processed, disposed]
 *                 example: received
 *               updated_by:
 *                 type: string
 *                 example: Eng. Priya Fernando
 *     responses:
 *       200:
 *         description: Status updated with audit entry created
 */
router.put('/ewaste/:id/status', ctrl.updateStatus);

/**
 * @swagger
 * /ewaste/centers:
 *   get:
 *     summary: Get all specialized processing centers
 *     tags: [Hazardous & E-Waste Tracker]
 *     parameters:
 *       - in: query
 *         name: waste_type
 *         schema:
 *           type: string
 *         description: Filter centers by accepted waste type
 *         example: battery
 *     responses:
 *       200:
 *         description: List of specialized processing centers
 */
router.get('/ewaste/centers', ctrl.getCenters);

/**
 * @swagger
 * /ewaste/audit-log:
 *   get:
 *     summary: Get the full environmental compliance audit log
 *     tags: [Hazardous & E-Waste Tracker]
 *     parameters:
 *       - in: query
 *         name: tracking_code
 *         schema:
 *           type: string
 *         description: Filter audit entries by tracking code
 *         example: EW-2026-001
 *     responses:
 *       200:
 *         description: Immutable audit trail for environmental compliance
 */
router.get('/ewaste/audit-log', ctrl.getAuditLog);

/**
 * @swagger
 * /ewaste/reports:
 *   get:
 *     summary: Generate environmental compliance report
 *     tags: [Hazardous & E-Waste Tracker]
 *     responses:
 *       200:
 *         description: Summary report with statistics and compliance data
 */
router.get('/ewaste/reports', ctrl.getReports);

/**
 * @swagger
 * /ewaste/hazard-levels:
 *   get:
 *     summary: Get hazard level definitions
 *     tags: [Hazardous & E-Waste Tracker]
 *     responses:
 *       200:
 *         description: Hazard level reference guide
 */
router.get('/ewaste/hazard-levels', ctrl.getHazardLevels);

module.exports = router;
