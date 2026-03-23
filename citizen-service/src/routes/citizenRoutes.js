const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/citizenController');

/**
 * @swagger
 * tags:
 *   name: Citizen Engagement & Rewards
 *   description: Citizen profiles, Eco-Points system, and rewards redemption
 */

/**
 * @swagger
 * /citizens:
 *   get:
 *     summary: Get all registered citizens
 *     tags: [Citizen Engagement & Rewards]
 *     responses:
 *       200:
 *         description: List of citizens with their Eco-Points
 */
router.get('/citizens', ctrl.getAllCitizens);

/**
 * @swagger
 * /profile/{id}:
 *   get:
 *     summary: Get citizen profile with Eco-Points and recycling history
 *     tags: [Citizen Engagement & Rewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cit-001
 *     responses:
 *       200:
 *         description: Citizen profile with full history
 *       404:
 *         description: Citizen not found
 */
router.get('/profile/:id', ctrl.getCitizenById);

/**
 * @swagger
 * /citizens:
 *   post:
 *     summary: Register a new citizen
 *     tags: [Citizen Engagement & Rewards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sumudu Perera
 *               email:
 *                 type: string
 *                 example: sumudu@email.com
 *               phone:
 *                 type: string
 *                 example: "+94773333333"
 *               address:
 *                 type: string
 *                 example: No. 10, Temple Road, Colombo 05
 *     responses:
 *       201:
 *         description: Citizen registered with Bronze tier and First Recycler badge
 */
router.post('/citizens', ctrl.createCitizen);

/**
 * @swagger
 * /points/add:
 *   post:
 *     summary: Add Eco-Points for recycling drop-off
 *     tags: [Citizen Engagement & Rewards]
 *     description: |
 *       Points awarded per kg: plastic=50, glass=40, paper=30, metal=60, organic=20, electronic=100.
 *       Automatically upgrades tier (Bronze/Silver/Gold) and awards badges.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [citizen_id, waste_type, quantity_kg]
 *             properties:
 *               citizen_id:
 *                 type: string
 *                 example: cit-001
 *               waste_type:
 *                 type: string
 *                 enum: [plastic, glass, paper, metal, organic, electronic]
 *                 example: plastic
 *               quantity_kg:
 *                 type: number
 *                 example: 2.5
 *     responses:
 *       200:
 *         description: Points awarded with badge/tier updates
 */
router.post('/points/add', ctrl.addPoints);

/**
 * @swagger
 * /rewards/redeem:
 *   post:
 *     summary: Redeem Eco-Points for a reward
 *     tags: [Citizen Engagement & Rewards]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [citizen_id, reward_id]
 *             properties:
 *               citizen_id:
 *                 type: string
 *                 example: cit-002
 *               reward_id:
 *                 type: string
 *                 example: rwd-001
 *     responses:
 *       200:
 *         description: Reward redeemed with voucher code
 *       400:
 *         description: Insufficient points or reward unavailable
 */
router.post('/rewards/redeem', ctrl.redeemReward);

/**
 * @swagger
 * /rewards/catalog:
 *   get:
 *     summary: Get full rewards catalog
 *     tags: [Citizen Engagement & Rewards]
 *     parameters:
 *       - in: query
 *         name: available
 *         schema:
 *           type: boolean
 *         description: Filter only available rewards
 *     responses:
 *       200:
 *         description: Rewards catalog
 */
router.get('/rewards/catalog', ctrl.getRewardsCatalog);

/**
 * @swagger
 * /rewards/redemptions:
 *   get:
 *     summary: Get redemption history
 *     tags: [Citizen Engagement & Rewards]
 *     parameters:
 *       - in: query
 *         name: citizen_id
 *         schema:
 *           type: string
 *         description: Filter by citizen ID
 *     responses:
 *       200:
 *         description: Redemption history
 */
router.get('/rewards/redemptions', ctrl.getRedemptionHistory);

/**
 * @swagger
 * /points/config:
 *   get:
 *     summary: Get points configuration per waste type
 *     tags: [Citizen Engagement & Rewards]
 *     responses:
 *       200:
 *         description: Points awarded per kg for each waste type
 */
router.get('/points/config', ctrl.getPointsConfig);

/**
 * @swagger
 * /citizens/{id}:
 *   put:
 *     summary: Update a citizen's profile details
 *     tags: [Citizen Engagement & Rewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cit-001
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Amara Wijesinghe Updated
 *               email:
 *                 type: string
 *                 example: amara.new@email.com
 *               phone:
 *                 type: string
 *                 example: "+94779999999"
 *               address:
 *                 type: string
 *                 example: No. 15, New Road, Colombo 05
 *     responses:
 *       200:
 *         description: Citizen profile updated successfully
 *       400:
 *         description: No valid fields provided
 *       404:
 *         description: Citizen not found
 */
router.put('/citizens/:id', ctrl.updateCitizen);

/**
 * @swagger
 * /citizens/{id}:
 *   delete:
 *     summary: Remove a citizen from the system
 *     tags: [Citizen Engagement & Rewards]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: cit-001
 *     responses:
 *       200:
 *         description: Citizen removed successfully
 *       404:
 *         description: Citizen not found
 */
router.delete('/citizens/:id', ctrl.deleteCitizen);

module.exports = router;
