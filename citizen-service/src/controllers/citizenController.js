const store = require('../models/citizenStore');

const getAllCitizens = (req, res) => {
  const citizens = store.getAllCitizens();
  res.json({ success: true, count: citizens.length, data: citizens });
};

const getCitizenById = (req, res) => {
  const citizen = store.getCitizenById(req.params.id);
  if (!citizen) return res.status(404).json({ success: false, message: 'Citizen not found' });
  res.json({ success: true, data: citizen });
};

const createCitizen = (req, res) => {
  const { name, email, phone, address } = req.body;
  if (!name || !email) {
    return res.status(400).json({ success: false, message: 'name and email are required' });
  }
  const citizen = store.createCitizen({ name, email, phone, address });
  res.status(201).json({ success: true, message: 'Citizen registered successfully', data: citizen });
};

const addPoints = (req, res) => {
  const { citizen_id, waste_type, quantity_kg } = req.body;
  if (!citizen_id || !waste_type || !quantity_kg) {
    return res.status(400).json({ success: false, message: 'citizen_id, waste_type, and quantity_kg are required' });
  }

  const result = store.addPoints(citizen_id, waste_type, quantity_kg);
  if (!result) return res.status(404).json({ success: false, message: 'Citizen not found' });
  if (result.error) return res.status(400).json({ success: false, message: result.error });

  res.json({
    success: true,
    message: `🌿 ${result.points_earned} Eco-Points awarded for recycling ${quantity_kg}kg of ${waste_type}!`,
    data: {
      points_earned: result.points_earned,
      total_eco_points: result.citizen.eco_points,
      tier: result.citizen.tier,
      badges: result.citizen.badges,
      entry: result.entry
    }
  });
};

const redeemReward = (req, res) => {
  const { citizen_id, reward_id } = req.body;
  if (!citizen_id || !reward_id) {
    return res.status(400).json({ success: false, message: 'citizen_id and reward_id are required' });
  }

  const result = store.redeemReward(citizen_id, reward_id);
  if (result.error) return res.status(400).json({ success: false, message: result.error });

  res.json({
    success: true,
    message: `🎁 Reward redeemed! Voucher code: ${result.redemption.voucher_code}`,
    data: result.redemption,
    remaining_points: result.remaining_points
  });
};

const getRewardsCatalog = (req, res) => {
  const catalog = store.getRewardsCatalog();
  const { available } = req.query;
  const filtered = available === 'true' ? catalog.filter(r => r.available) : catalog;
  res.json({ success: true, count: filtered.length, data: filtered });
};

const getRedemptionHistory = (req, res) => {
  const { citizen_id } = req.query;
  const redemptions = store.getRedemptions(citizen_id);
  res.json({ success: true, count: redemptions.length, data: redemptions });
};

const getPointsConfig = (req, res) => {
  res.json({
    success: true,
    message: 'Points awarded per kg of each waste type',
    data: store.getPointsConfig()
  });
};

const updateCitizen = (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name && !email && !phone && !address) {
    return res.status(400).json({
      success: false,
      message: 'Provide at least one field to update: name, email, phone, address'
    });
  }

  const citizen = store.updateCitizen(req.params.id, { name, email, phone, address });
  if (!citizen) return res.status(404).json({ success: false, message: 'Citizen not found' });

  res.json({ success: true, message: 'Citizen profile updated successfully', data: citizen });
};

const deleteCitizen = (req, res) => {
  const citizen = store.deleteCitizen(req.params.id);
  if (!citizen) return res.status(404).json({ success: false, message: 'Citizen not found' });

  res.json({
    success: true,
    message: `Citizen '${citizen.name}' has been removed from the system`,
    data: { id: citizen.id, name: citizen.name, eco_points: citizen.eco_points }
  });
};

module.exports = {
  getAllCitizens,
  getCitizenById,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  addPoints,
  redeemReward,
  getRewardsCatalog,
  getRedemptionHistory,
  getPointsConfig
};
