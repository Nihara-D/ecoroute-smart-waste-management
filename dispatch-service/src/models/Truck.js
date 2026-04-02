
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('Truck', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, plate: String, driver: String, driver_phone: String, capacity_liters: Number, current_load: Number, status: String, current_location: Object, zone: String
}));