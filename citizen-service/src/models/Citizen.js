
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('Citizen', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, name: String, email: String, phone: String, address: String, eco_points: { type: Number, default: 0 }, total_points_earned: { type: Number, default: 0 }, total_points_redeemed: { type: Number, default: 0 }, recycling_history: Array, badges: Array, member_since: String, tier: { type: String, default: 'Bronze' }
}));