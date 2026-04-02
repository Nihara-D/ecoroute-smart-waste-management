
const mongoose = require('mongoose');
module.exports = mongoose.model('Reward', new mongoose.Schema({
  id: String, name: String, description: String, points_required: Number, category: String, available: Boolean, quantity: Number
}));