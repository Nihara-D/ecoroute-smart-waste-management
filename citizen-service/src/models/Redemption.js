
const mongoose = require('mongoose');
module.exports = mongoose.model('Redemption', new mongoose.Schema({
  id: String, citizen_id: String, citizen_name: String, reward_id: String, reward_name: String, points_spent: Number, redeemed_at: Date, voucher_code: String
}));