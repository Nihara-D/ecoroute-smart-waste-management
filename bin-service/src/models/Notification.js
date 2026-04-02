
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  bin_id: String, bin_name: String, fill_level: Number, zone: String, triggered_at: { type: Date, default: Date.now }, message: String, dispatched: { type: Boolean, default: false }
});
module.exports = mongoose.model('Notification', schema);