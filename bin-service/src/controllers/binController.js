const Bin = require('../models/Bin');
const Notification = require('../models/Notification');



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

module.exports = {
  getAllBins,
  getBinById,
  createBin,
  updateFillLevel,
  getFullBins,
  getNotifications,
  deleteBin
};
