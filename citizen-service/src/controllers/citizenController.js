
  const Citizen = require('../models/Citizen');
  const Reward = require('../models/Reward');
  const Redemption = require('../models/Redemption');
  const { v4: uuidv4 } = require('uuid');

  const getCitizenById = async (req, res) => { const c = await Citizen.findOne({id: req.params.id}); res.json({ success: true, data: c }); };
  const getAllCitizens = async (req, res) => { const c = await Citizen.find(); res.json({ success: true, data: c }); };
  const createCitizen = async (req, res) => { const c = await Citizen.create(req.body); res.json({ success: true, data: c }); };
  const updateCitizen = async (req, res) => { 
     const c = await Citizen.findOneAndUpdate({id: req.params.id}, req.body, {new: true});
     res.json({ success: true, data: c }); 
  };
  const deleteCitizen = async (req, res) => { await Citizen.findOneAndDelete({id: req.params.id}); res.json({ success: true }); };
  
  const addPoints = async (req, res) => {
    try {
      const { waste_type, quantity_kg } = req.body;
      const c = await Citizen.findOne({id: req.params.id});
      if(!c) return res.status(404).json({ success: false });
      const points = 50 * quantity_kg; // Simple calc
      c.eco_points += points; c.total_points_earned += points;
      c.recycling_history.push({ waste_type, quantity_kg, points_earned: points, date: new Date() });
      await c.save();
      res.json({ success: true, data: c });
    } catch(e) {}
  };
  const getRewardsCatalog = async (req, res) => { const r = await Reward.find(); res.json({ success: true, data: r }); };
  const redeemReward = async (req, res) => {
    try {
      const { rewardId } = req.body;
      const c = await Citizen.findOne({id: req.params.id});
      const r = await Reward.findOne({id: rewardId});
      if(c.eco_points < r.points_required) return res.status(400).json({ success: false, message: 'Insufficient points' });
      c.eco_points -= r.points_required; c.total_points_redeemed += r.points_required;
      r.quantity -= 1;
      await c.save(); await r.save();
      const red = await Redemption.create({ id: uuidv4(), citizen_id: c.id, citizen_name: c.name, reward_id: r.id, reward_name: r.name, points_spent: r.points_required, redeemed_at: new Date(), voucher_code: 'VOUCHER123' });
      res.json({ success: true, data: { redemption: red } });
    } catch(e) {}
  };
  const getRedemptions = async (req, res) => { const r = await Redemption.find(); res.json({ success: true, data: r }); };
  const getPointsConfig = async (req, res) => { res.json({ success: true, data: {} }); };
  
  module.exports = { getCitizenById, getAllCitizens, createCitizen, updateCitizen, deleteCitizen, addPoints, getRewardsCatalog, redeemReward, getRedemptions, getPointsConfig };
  