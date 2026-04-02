
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('Task', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, truck_id: String, bin_ids: [String], status: String, priority: String, assigned_at: Date, estimated_completion: Date, completed_at: Date, route_summary: String, total_bins: Number, notes: String, truck_plate: String, driver: String, bins: Array, optimization_notes: String
}));