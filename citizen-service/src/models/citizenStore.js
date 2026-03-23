const { v4: uuidv4 } = require('uuid');

// Points awarded per waste type (per kg or per drop)
const POINTS_CONFIG = {
  plastic: 50,
  glass: 40,
  paper: 30,
  metal: 60,
  organic: 20,
  electronic: 100
};

// Citizen profiles
let citizens = [
  {
    id: 'cit-001',
    name: 'Amara Wijesinghe',
    email: 'amara@email.com',
    phone: '+94771111111',
    address: 'No. 5, Lotus Road, Colombo 01',
    eco_points: 350,
    total_points_earned: 500,
    total_points_redeemed: 150,
    recycling_history: [
      { id: uuidv4(), waste_type: 'plastic', quantity_kg: 2, points_earned: 100, date: '2026-03-20' },
      { id: uuidv4(), waste_type: 'glass', quantity_kg: 1.5, points_earned: 60, date: '2026-03-21' }
    ],
    badges: ['First Recycler', 'Plastic Warrior'],
    member_since: '2026-01-15',
    tier: 'Silver'
  },
  {
    id: 'cit-002',
    name: 'Dinesh Bandara',
    email: 'dinesh@email.com',
    phone: '+94772222222',
    address: 'No. 22, Galle Road, Colombo 03',
    eco_points: 1200,
    total_points_earned: 1500,
    total_points_redeemed: 300,
    recycling_history: [
      { id: uuidv4(), waste_type: 'metal', quantity_kg: 5, points_earned: 300, date: '2026-03-18' }
    ],
    badges: ['Eco Champion', 'Metal Master', 'First Recycler'],
    member_since: '2025-11-01',
    tier: 'Gold'
  }
];

// Rewards catalog
let rewardsCatalog = [
  { id: 'rwd-001', name: 'Free Bus Pass (Day)', description: 'One day unlimited bus travel in Colombo', points_required: 200, category: 'transport', available: true, quantity: 50 },
  { id: 'rwd-002', name: 'Coffee Voucher - Barista', description: 'One free coffee at Barista outlets', points_required: 150, category: 'food', available: true, quantity: 100 },
  { id: 'rwd-003', name: 'Utility Bill Discount (Rs.500)', description: '500 LKR off your next electricity bill', points_required: 500, category: 'utility', available: true, quantity: 30 },
  { id: 'rwd-004', name: 'Movie Ticket', description: 'One free movie ticket at Liberty Cinema', points_required: 300, category: 'entertainment', available: true, quantity: 20 },
  { id: 'rwd-005', name: 'EcoRoute Plant Kit', description: 'Home garden starter kit with 5 plants', points_required: 400, category: 'eco', available: true, quantity: 15 },
  { id: 'rwd-006', name: 'Supermarket Voucher (Rs.1000)', description: 'Rs. 1000 voucher at Keells Super', points_required: 800, category: 'shopping', available: true, quantity: 10 }
];

// Redemption history
let redemptions = [];

const getCitizenById = (id) => citizens.find(c => c.id === id);
const getAllCitizens = () => citizens;

const createCitizen = (data) => {
  const citizen = {
    id: uuidv4(),
    ...data,
    eco_points: 0,
    total_points_earned: 0,
    total_points_redeemed: 0,
    recycling_history: [],
    badges: ['First Recycler'],
    member_since: new Date().toISOString().split('T')[0],
    tier: 'Bronze'
  };
  citizens.push(citizen);
  return citizen;
};

const determineTier = (totalPoints) => {
  if (totalPoints >= 1000) return 'Gold';
  if (totalPoints >= 500) return 'Silver';
  return 'Bronze';
};

const addPoints = (citizenId, waste_type, quantity_kg) => {
  const citizen = citizens.find(c => c.id === citizenId);
  if (!citizen) return null;

  const pointsPerUnit = POINTS_CONFIG[waste_type];
  if (!pointsPerUnit) return { error: `Unknown waste type: ${waste_type}. Valid: ${Object.keys(POINTS_CONFIG).join(', ')}` };

  const points_earned = Math.floor(pointsPerUnit * quantity_kg);
  const entry = {
    id: uuidv4(),
    waste_type,
    quantity_kg,
    points_earned,
    date: new Date().toISOString().split('T')[0],
    timestamp: new Date().toISOString()
  };

  citizen.recycling_history.push(entry);
  citizen.eco_points += points_earned;
  citizen.total_points_earned += points_earned;
  citizen.tier = determineTier(citizen.total_points_earned);

  // Badge logic
  if (citizen.total_points_earned >= 1000 && !citizen.badges.includes('Eco Champion')) {
    citizen.badges.push('Eco Champion');
  }
  if (waste_type === 'plastic' && !citizen.badges.includes('Plastic Warrior')) {
    citizen.badges.push('Plastic Warrior');
  }
  if (waste_type === 'electronic' && !citizen.badges.includes('E-Waste Hero')) {
    citizen.badges.push('E-Waste Hero');
  }

  return { citizen, entry, points_earned };
};

const redeemReward = (citizenId, rewardId) => {
  const citizen = citizens.find(c => c.id === citizenId);
  if (!citizen) return { error: 'Citizen not found' };

  const reward = rewardsCatalog.find(r => r.id === rewardId);
  if (!reward) return { error: 'Reward not found' };
  if (!reward.available || reward.quantity === 0) return { error: 'Reward not available' };
  if (citizen.eco_points < reward.points_required) {
    return { error: `Insufficient points. Required: ${reward.points_required}, Available: ${citizen.eco_points}` };
  }

  citizen.eco_points -= reward.points_required;
  citizen.total_points_redeemed += reward.points_required;
  reward.quantity -= 1;
  if (reward.quantity === 0) reward.available = false;

  const redemption = {
    id: uuidv4(),
    citizen_id: citizenId,
    citizen_name: citizen.name,
    reward_id: rewardId,
    reward_name: reward.name,
    points_spent: reward.points_required,
    redeemed_at: new Date().toISOString(),
    voucher_code: `ECO-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
  };
  redemptions.push(redemption);

  return { redemption, remaining_points: citizen.eco_points };
};

const updateCitizen = (id, data) => {
  const citizen = citizens.find(c => c.id === id);
  if (!citizen) return null;

  // Only allow updating these fields — protect points/tier/history
  const allowed = ['name', 'email', 'phone', 'address'];
  allowed.forEach(field => {
    if (data[field] !== undefined) citizen[field] = data[field];
  });

  citizen.updated_at = new Date().toISOString();
  return citizen;
};

const deleteCitizen = (id) => {
  const index = citizens.findIndex(c => c.id === id);
  if (index === -1) return null;
  const deleted = citizens[index];
  citizens.splice(index, 1);
  return deleted;
};

const getRewardsCatalog = () => rewardsCatalog;
const getRedemptions = (citizenId) => citizenId ? redemptions.filter(r => r.citizen_id === citizenId) : redemptions;
const getPointsConfig = () => POINTS_CONFIG;

module.exports = {
  getCitizenById,
  getAllCitizens,
  createCitizen,
  updateCitizen,
  deleteCitizen,
  addPoints,
  redeemReward,
  getRewardsCatalog,
  getRedemptions,
  getPointsConfig
};
