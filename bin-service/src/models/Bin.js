
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: String, location: Object, type: String, capacity_liters: Number, fill_level: { type: Number, default: 0 },
  status: { type: String, default: 'active' }, sensor_id: String, zone: String
}, { timestamps: true });
module.exports = mongoose.model('Bin', schema);