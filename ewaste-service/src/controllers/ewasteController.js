const store = require('../models/ewasteStore');

const logEwaste = (req, res) => {
  const { waste_type, item_description, quantity, unit, weight_kg, hazard_level, source, compliance_notes, logged_by } = req.body;

  if (!waste_type || !item_description || !weight_kg || !source) {
    return res.status(400).json({
      success: false,
      message: 'Required fields: waste_type, item_description, weight_kg, source'
    });
  }

  const result = store.logEwaste({ waste_type, item_description, quantity, unit, weight_kg, hazard_level, source, compliance_notes, logged_by });

  res.status(201).json({
    success: true,
    message: `E-Waste logged successfully. Tracking code: ${result.entry.tracking_code}`,
    data: {
      tracking_code: result.entry.tracking_code,
      entry: result.entry,
      assigned_center: result.assigned_center
    }
  });
};

const getAllLogs = (req, res) => {
  const { status, waste_type, hazard_level } = req.query;
  const logs = store.getAllLogs({ status, waste_type, hazard_level });
  res.json({ success: true, count: logs.length, data: logs });
};

const getLogById = (req, res) => {
  const log = store.getLogById(req.params.id);
  if (!log) return res.status(404).json({ success: false, message: 'E-Waste log not found' });
  res.json({ success: true, data: log });
};

const updateStatus = (req, res) => {
  const { status, updated_by } = req.body;
  const validStatuses = ['logged', 'in-transit', 'received', 'processing', 'processed', 'disposed'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `status must be one of: ${validStatuses.join(', ')}`
    });
  }

  const log = store.updateStatus(req.params.id, status, updated_by);
  if (!log) return res.status(404).json({ success: false, message: 'E-Waste log not found' });

  res.json({ success: true, message: `Status updated to '${status}'`, data: log });
};

const getCenters = (req, res) => {
  const { waste_type } = req.query;
  const centers = store.getCenters(waste_type);

  res.json({
    success: true,
    count: centers.length,
    message: waste_type ? `Centers accepting '${waste_type}'` : 'All specialized processing centers',
    data: centers
  });
};

const getAuditLog = (req, res) => {
  const { tracking_code } = req.query;
  const log = store.getAuditLog(tracking_code);
  res.json({
    success: true,
    count: log.length,
    message: tracking_code ? `Audit trail for ${tracking_code}` : 'Full environmental compliance audit log',
    data: log
  });
};

const getReports = (req, res) => {
  const report = store.generateReport();
  res.json({ success: true, data: report });
};

const getHazardLevels = (req, res) => {
  res.json({ success: true, data: store.HAZARD_LEVELS });
};

module.exports = {
  logEwaste,
  getAllLogs,
  getLogById,
  updateStatus,
  getCenters,
  getAuditLog,
  getReports,
  getHazardLevels
};
