const fs = require('fs');
const path = require('path');

const basePaths = [
  { dir: 'bin-service', port: 3001 },
  { dir: 'dispatch-service', port: 3002 },
  { dir: 'citizen-service', port: 3003 },
  { dir: 'ewaste-service', port: 3004 }
];

const connectDBTemplate = `
const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(\`MongoDB Connected: \${conn.connection.host}\`);
  } catch (error) {
    console.error(\`Error: \${error.message}\`);
    process.exit(1);
  }
};
module.exports = connectDB;
`;

basePaths.forEach(({ dir, port }) => {
  const fullPath = path.join(__dirname, dir);
  
  // 1. .env
  fs.writeFileSync(path.join(fullPath, '.env'), `PORT=${port}\nMONGODB_URI=mongodb://127.0.0.1:27017/ecoroute\n`);
  
  // 2. src/config/db.js
  const configDir = path.join(fullPath, 'src', 'config');
  if(!fs.existsSync(configDir)) fs.mkdirSync(configDir, { recursive: true });
  fs.writeFileSync(path.join(configDir, 'db.js'), connectDBTemplate);
  
  // 3. Update index.js
  const indexFile = path.join(fullPath, 'src', 'index.js');
  if(fs.existsSync(indexFile)) {
    let indexContent = fs.readFileSync(indexFile, 'utf8');
    if(!indexContent.includes('dotenv')) {
      indexContent = `require('dotenv').config();\nconst connectDB = require('./config/db');\n` + indexContent;
      indexContent = indexContent.replace(`const app = express();`, `const app = express();\nconnectDB();`);
      fs.writeFileSync(indexFile, indexContent);
    }
  }
});

// ---------- BIN SERVICE -------------
const binModels = path.join(__dirname, 'bin-service', 'src', 'models');
fs.writeFileSync(path.join(binModels, 'Bin.js'), `
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  name: String, location: Object, type: String, capacity_liters: Number, fill_level: { type: Number, default: 0 },
  status: { type: String, default: 'active' }, sensor_id: String, zone: String
}, { timestamps: true });
module.exports = mongoose.model('Bin', schema);`);

fs.writeFileSync(path.join(binModels, 'Notification.js'), `
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const schema = new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true },
  bin_id: String, bin_name: String, fill_level: Number, zone: String, triggered_at: { type: Date, default: Date.now }, message: String, dispatched: { type: Boolean, default: false }
});
module.exports = mongoose.model('Notification', schema);`);
if(fs.existsSync(path.join(binModels, 'binStore.js'))) fs.unlinkSync(path.join(binModels, 'binStore.js'));

const binControllerPath = path.join(__dirname, 'bin-service', 'src', 'controllers', 'binController.js');
let binCont = fs.readFileSync(binControllerPath, 'utf8');
binCont = binCont.replace(/const store = require\('\.\.\/models\/binStore'\);/g, `const Bin = require('../models/Bin');\nconst Notification = require('../models/Notification');`);
binCont = binCont.replace(/const getAllBins.*\}\;/ms, `
const getAllBins = async (req, res) => {
  try {
    const { zone, type, status } = req.query;
    let query = {};
    if(zone) query.zone = zone; if(type) query.type = type; if(status) query.status = status;
    const bins = await Bin.find(query);
    res.json({ success: true, count: bins.length, data: bins });
  } catch(e) { res.status(500).json({ success: false, message: e.message }); }
};
const getBinById = async (req, res) => {
  try { 
     const bin = await Bin.findOne({id: req.params.id}); 
     if(!bin) return res.status(404).json({ success: false, message: 'Not found' });
     res.json({ success: true, data: bin });
  } catch(e) { res.status(500).json({ success: false, message: e.message }); }
};
const createBin = async (req, res) => {
  try {
     const bin = await Bin.create({...req.body, capacity_liters: req.body.capacity_liters || 240});
     res.status(201).json({ success: true, data: bin, message: 'registered' });
  } catch(e) { res.status(500).json({ success: false, message: e.message }); }
};
const updateFillLevel = async (req, res) => {
  try {
     const { fill_level } = req.body;
     const bin = await Bin.findOne({id: req.params.id});
     if(!bin) return res.status(404).json({ success: false, message: 'Not found' });
     bin.fill_level = fill_level;
     let notification = null, triggered = false;
     if(fill_level >= 80) {
        bin.status = 'full'; triggered = true;
        notification = await Notification.create({bin_id: bin.id, bin_name: bin.name, fill_level, zone: bin.zone, message: 'ALERT full'});
     } else { bin.status = fill_level < 10 ? 'empty' : 'active'; }
     await bin.save();
     res.json({ success: true, data: bin, threshold_triggered: triggered, notification });
  } catch(e) { res.status(500).json({ success: false, message: e.message }); }
};
const getFullBins = async (req, res) => {
  try { const bins = await Bin.find({fill_level: {$gte: 80}}); res.json({ success: true, count: bins.length, data: bins }); } catch(e) {}
};
const getNotifications = async (req, res) => {
  try { const n = await Notification.find(); res.json({ success: true, data: n }); } catch(e) {}
};
const deleteBin = async (req, res) => {
  try { await Bin.findOneAndDelete({id: req.params.id}); res.json({ success: true }); } catch(e) {}
};
`);
fs.writeFileSync(binControllerPath, binCont);

// ---------- DISPATCH SERVICE -------------
const dispModels = path.join(__dirname, 'dispatch-service', 'src', 'models');
fs.writeFileSync(path.join(dispModels, 'Truck.js'), `
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('Truck', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, plate: String, driver: String, driver_phone: String, capacity_liters: Number, current_load: Number, status: String, current_location: Object, zone: String
}));`);
fs.writeFileSync(path.join(dispModels, 'Task.js'), `
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('Task', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, truck_id: String, bin_ids: [String], status: String, priority: String, assigned_at: Date, estimated_completion: Date, completed_at: Date, route_summary: String, total_bins: Number, notes: String, truck_plate: String, driver: String, bins: Array, optimization_notes: String
}));`);
if(fs.existsSync(path.join(dispModels, 'dispatchStore.js'))) fs.unlinkSync(path.join(dispModels, 'dispatchStore.js'));

const dispControllerPath = path.join(__dirname, 'dispatch-service', 'src', 'controllers', 'dispatchController.js');
if(fs.existsSync(dispControllerPath)) {
let dispCont = fs.readFileSync(dispControllerPath, 'utf8');
dispCont = `
const Truck = require('../models/Truck');
const Task = require('../models/Task');
const axios = require('axios');

const getTrucks = async (req, res) => { const t = await Truck.find(); res.json({ success: true, data: t }); };
const getTruckById = async (req, res) => { const t = await Truck.findOne({id: req.params.id}); res.json({ success: true, data: t }); };
const getTasks = async (req, res) => { const t = await Task.find(); res.json({ success: true, data: t }); };
const getTaskById = async (req, res) => { const t = await Task.findOne({id: req.params.id}); res.json({ success: true, data: t }); };
const getActiveTasks = async (req, res) => { const t = await Task.find({status: {$ne: 'completed'}}); res.json({ success: true, data: t }); };

const assignTask = async (req, res) => {
  try {
    const { bin_ids, notes } = req.body;
    const trucks = await Truck.find({status: 'available'});
    if(trucks.length === 0) return res.status(400).json({ success: false, message: 'No trucks available' });
    const truck = trucks[0]; // Simple selection for now
    truck.status = 'on-route';
    await truck.save();
    
    const task = await Task.create({
      truck_id: truck.id, truck_plate: truck.plate, driver: truck.driver,
      bin_ids: bin_ids || [], status: 'in-progress', assigned_at: new Date(), notes: notes || 'Auto-dispatched'
    });
    res.json({ success: true, data: { task, truck } });
  } catch(e) { res.status(500).json({ success: false, message: e.message }); }
};
const completeTask = async (req, res) => {
  try {
    const task = await Task.findOne({id: req.params.id});
    if(!task) return res.status(404).json({ success: false });
    task.status = 'completed'; task.completed_at = new Date(); await task.save();
    
    const truck = await Truck.findOne({id: task.truck_id});
    if(truck) { truck.status = 'available'; truck.current_load = 0; await truck.save(); }
    res.json({ success: true, data: task });
  } catch(e) { res.status(500).json({ success: false, message: e.message }); }
};
module.exports = { getTrucks, getTruckById, getTasks, getTaskById, getActiveTasks, assignTask, completeTask };
`;
fs.writeFileSync(dispControllerPath, dispCont);
}

// ---------- CITIZEN SERVICE -------------
const citModels = path.join(__dirname, 'citizen-service', 'src', 'models');
fs.writeFileSync(path.join(citModels, 'Citizen.js'), `
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('Citizen', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, name: String, email: String, phone: String, address: String, eco_points: { type: Number, default: 0 }, total_points_earned: { type: Number, default: 0 }, total_points_redeemed: { type: Number, default: 0 }, recycling_history: Array, badges: Array, member_since: String, tier: { type: String, default: 'Bronze' }
}));`);
fs.writeFileSync(path.join(citModels, 'Reward.js'), `
const mongoose = require('mongoose');
module.exports = mongoose.model('Reward', new mongoose.Schema({
  id: String, name: String, description: String, points_required: Number, category: String, available: Boolean, quantity: Number
}));`);
fs.writeFileSync(path.join(citModels, 'Redemption.js'), `
const mongoose = require('mongoose');
module.exports = mongoose.model('Redemption', new mongoose.Schema({
  id: String, citizen_id: String, citizen_name: String, reward_id: String, reward_name: String, points_spent: Number, redeemed_at: Date, voucher_code: String
}));`);
if(fs.existsSync(path.join(citModels, 'citizenStore.js'))) fs.unlinkSync(path.join(citModels, 'citizenStore.js'));

const citControllerPath = path.join(__dirname, 'citizen-service', 'src', 'controllers', 'citizenController.js');
if(fs.existsSync(citControllerPath)){
  let citCont = `
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
  `;
  fs.writeFileSync(citControllerPath, citCont);
}

// ---------- EWASTE SERVICE -------------
const ewModels = path.join(__dirname, 'ewaste-service', 'src', 'models');
fs.writeFileSync(path.join(ewModels, 'EWasteItem.js'), `
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
module.exports = mongoose.model('EWasteItem', new mongoose.Schema({
  id: { type: String, default: uuidv4, unique: true }, type: String, quantity: Number, unit: String, status: String, center_id: String, logged_at: Date
}));`);
if(fs.existsSync(path.join(ewModels, 'ewasteStore.js'))) fs.unlinkSync(path.join(ewModels, 'ewasteStore.js'));

const ewControllerPath = path.join(__dirname, 'ewaste-service', 'src', 'controllers', 'ewasteController.js');
if(fs.existsSync(ewControllerPath)){
  let ewCont = `
  const EWasteItem = require('../models/EWasteItem');
  
  const getCenters = async (req, res) => { res.json({ success: true, data: [] }); };
  const getItems = async (req, res) => { const items = await EWasteItem.find(); res.json({ success: true, data: items }); };
  const logItem = async (req, res) => { const item = await EWasteItem.create({...req.body, status: 'logged', logged_at: new Date()}); res.json({ success: true, data: item }); };
  const updateItemStatus = async (req, res) => { const item = await EWasteItem.findOneAndUpdate({id: req.params.id}, {status: req.body.status}, {new: true}); res.json({ success: true, data: item }); };
  const getImpactReport = async (req, res) => { res.json({ success: true, data: {} }); };
  
  module.exports = { getCenters, getItems, logItem, updateItemStatus, getImpactReport };
  `;
  fs.writeFileSync(ewControllerPath, ewCont);
}

console.log('Migration completed successfully.');
