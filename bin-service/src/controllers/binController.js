const store = require('../models/binStore');

const getAllBins = (req, res) => {
  const { zone, type, status } = req.query;
  let bins = store.getBins();

  if (zone) bins = bins.filter(b => b.zone === zone);
  if (type) bins = bins.filter(b => b.type === type);
  if (status) bins = bins.filter(b => b.status === status);

  res.json({
    success: true,
    count: bins.length,
    data: bins
  });
};

const getBinById = (req, res) => {
  const bin = store.getBinById(req.params.id);
  if (!bin) {
    return res.status(404).json({ success: false, message: 'Bin not found' });
  }
  res.json({ success: true, data: bin });
};

const createBin = (req, res) => {
  const { name, location, type, capacity_liters, sensor_id, zone } = req.body;

  if (!name || !location || !type || !zone) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, location, type, zone'
    });
  }

  const bin = store.createBin({ name, location, type, capacity_liters: capacity_liters || 240, sensor_id, zone });
  res.status(201).json({ success: true, message: 'Bin registered successfully', data: bin });
};

const updateFillLevel = (req, res) => {
  const { fill_level } = req.body;

  if (fill_level === undefined || fill_level < 0 || fill_level > 100) {
    return res.status(400).json({
      success: false,
      message: 'fill_level must be a number between 0 and 100'
    });
  }

  const result = store.updateFillLevel(req.params.id, fill_level);
  if (!result) {
    return res.status(404).json({ success: false, message: 'Bin not found' });
  }

  const response = {
    success: true,
    message: result.threshold_triggered
      ? `Bin updated. THRESHOLD ALERT: Bin is at ${fill_level}% - Dispatch notification sent!`
      : `Bin fill level updated to ${fill_level}%`,
    data: result.bin,
    threshold_triggered: result.threshold_triggered
  };

  if (result.notification) {
    response.notification = result.notification;
  }

  res.json(response);
};

const getFullBins = (req, res) => {
  const bins = store.getFullBins();
  res.json({
    success: true,
    count: bins.length,
    message: `${bins.length} bin(s) require immediate collection`,
    data: bins
  });
};

const getNotifications = (req, res) => {
  const notifications = store.getNotifications();
  res.json({
    success: true,
    count: notifications.length,
    data: notifications
  });
};

const deleteBin = (req, res) => {
  const deleted = store.deleteBin(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Bin not found' });
  }
  res.json({ success: true, message: 'Bin deleted successfully' });
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
