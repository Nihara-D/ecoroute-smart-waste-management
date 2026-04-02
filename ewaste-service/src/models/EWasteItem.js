
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('EWasteItem', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, type: String, quantity: Number, unit: String, status: String, center_id: String, logged_at: Date
}));