const { v4: uuidv4 } = require('uuid');

// Specialized Processing Centers
let processingCenters = [
  {
    id: 'ctr-001',
    name: 'CEB E-Waste Recycling Center',
    address: 'No. 1, Sir Chittampalam A. Gardiner Mawatha, Colombo 02',
    location: { lat: 6.9271, lng: 79.8475 },
    accepts: ['electronic', 'battery', 'electrical_appliance'],
    contact: '+94112345678',
    operating_hours: 'Mon-Fri 8:00AM - 5:00PM',
    capacity_status: 'available',
    certification: 'ISO 14001:2015',
    manager: 'Eng. Priya Fernando'
  },
  {
    id: 'ctr-002',
    name: 'National Hazardous Waste Facility',
    address: 'Dompe Industrial Zone, Gampaha',
    location: { lat: 7.0737, lng: 80.0118 },
    accepts: ['chemical', 'medical', 'industrial_chemical', 'pesticide'],
    contact: '+94332211445',
    operating_hours: 'Mon-Sat 7:00AM - 6:00PM',
    capacity_status: 'available',
    certification: 'Basel Convention Compliant',
    manager: 'Dr. Rohan Gunawardena'
  },
  {
    id: 'ctr-003',
    name: 'Colombo Medical Waste Treatment Plant',
    address: 'Kelaniya, Western Province',
    location: { lat: 7.0000, lng: 79.9167 },
    accepts: ['medical', 'pharmaceutical', 'biological'],
    contact: '+94112987654',
    operating_hours: 'Mon-Sun 24/7',
    capacity_status: 'near_capacity',
    certification: 'WHO Medical Waste Guidelines',
    manager: 'Dr. Sandya Rathnayake'
  },
  {
    id: 'ctr-004',
    name: 'BatteryLanka Recycling Hub',
    address: 'Katunayake Export Processing Zone',
    location: { lat: 7.1686, lng: 79.8864 },
    accepts: ['battery', 'lead_acid', 'lithium'],
    contact: '+94312456789',
    operating_hours: 'Mon-Fri 8:00AM - 4:30PM',
    capacity_status: 'available',
    certification: 'Basel Convention Compliant',
    manager: 'Mr. Asitha Jayawardena'
  }
];

// E-Waste item logs
let ewasteLogs = [
  {
    id: 'ew-001',
    tracking_code: 'EW-2026-001',
    waste_type: 'electronic',
    item_description: 'Laptop Computer - Dell Inspiron',
    quantity: 3,
    unit: 'units',
    weight_kg: 6.5,
    hazard_level: 'medium',
    source: {
      type: 'corporate',
      name: 'SLIIT University',
      contact: 'it@sliit.lk',
      address: 'New Kandy Road, Malabe'
    },
    assigned_center_id: 'ctr-001',
    assigned_center_name: 'CEB E-Waste Recycling Center',
    status: 'received',
    logged_at: new Date('2026-03-20T09:00:00Z').toISOString(),
    received_at: new Date('2026-03-21T10:30:00Z').toISOString(),
    processed_at: null,
    compliance_notes: 'All data wiped before transfer. Chain of custody maintained.',
    environmental_impact: 'Prevents 2.1kg of toxic materials entering landfill'
  },
  {
    id: 'ew-002',
    tracking_code: 'EW-2026-002',
    waste_type: 'battery',
    item_description: 'Lead-acid car batteries',
    quantity: 8,
    unit: 'units',
    weight_kg: 80,
    hazard_level: 'high',
    source: {
      type: 'individual',
      name: 'Nimal Perera',
      contact: '+94771234567',
      address: 'Negombo Road, Wattala'
    },
    assigned_center_id: 'ctr-004',
    assigned_center_name: 'BatteryLanka Recycling Hub',
    status: 'in-transit',
    logged_at: new Date('2026-03-22T11:00:00Z').toISOString(),
    received_at: null,
    processed_at: null,
    compliance_notes: 'Hazardous material - special transport vehicle required.',
    environmental_impact: 'Prevents 24kg of lead from soil contamination'
  }
];

// Audit log - immutable record of all actions
let auditLog = [
  {
    id: uuidv4(),
    action: 'ITEM_LOGGED',
    tracking_code: 'EW-2026-001',
    ewaste_id: 'ew-001',
    performed_by: 'System',
    timestamp: new Date('2026-03-20T09:00:00Z').toISOString(),
    details: 'Initial logging of 3 laptop units from SLIIT University'
  },
  {
    id: uuidv4(),
    action: 'CENTER_ASSIGNED',
    tracking_code: 'EW-2026-001',
    ewaste_id: 'ew-001',
    performed_by: 'System',
    timestamp: new Date('2026-03-20T09:01:00Z').toISOString(),
    details: 'Auto-assigned to CEB E-Waste Recycling Center based on waste type'
  },
  {
    id: uuidv4(),
    action: 'ITEM_RECEIVED',
    tracking_code: 'EW-2026-001',
    ewaste_id: 'ew-001',
    performed_by: 'Eng. Priya Fernando',
    timestamp: new Date('2026-03-21T10:30:00Z').toISOString(),
    details: 'Items received and verified at processing center'
  },
  {
    id: uuidv4(),
    action: 'ITEM_LOGGED',
    tracking_code: 'EW-2026-002',
    ewaste_id: 'ew-002',
    performed_by: 'System',
    timestamp: new Date('2026-03-22T11:00:00Z').toISOString(),
    details: 'Initial logging of 8 lead-acid batteries'
  }
];

// Points config for hazard levels
const HAZARD_LEVELS = {
  low: { label: 'Low', description: 'Minimal environmental risk (paper, cardboard with ink)' },
  medium: { label: 'Medium', description: 'Moderate risk - requires proper handling (electronics, fluorescent lamps)' },
  high: { label: 'High', description: 'High risk - specialized disposal required (batteries, chemicals, medical)' },
  critical: { label: 'Critical', description: 'Extreme hazard - emergency protocols required (radioactive, cyanide)' }
};

const WASTE_TYPE_CENTER_MAP = {
  electronic: 'ctr-001',
  battery: 'ctr-004',
  lead_acid: 'ctr-004',
  lithium: 'ctr-004',
  chemical: 'ctr-002',
  industrial_chemical: 'ctr-002',
  pesticide: 'ctr-002',
  medical: 'ctr-003',
  pharmaceutical: 'ctr-003',
  biological: 'ctr-003',
  electrical_appliance: 'ctr-001'
};

const getAllLogs = (filters = {}) => {
  let logs = [...ewasteLogs];
  if (filters.status) logs = logs.filter(l => l.status === filters.status);
  if (filters.waste_type) logs = logs.filter(l => l.waste_type === filters.waste_type);
  if (filters.hazard_level) logs = logs.filter(l => l.hazard_level === filters.hazard_level);
  return logs;
};

const getLogById = (id) => ewasteLogs.find(l => l.id === id || l.tracking_code === id);

const logEwaste = (data) => {
  const tracking_code = `EW-${new Date().getFullYear()}-${String(ewasteLogs.length + 1).padStart(3, '0')}`;

  // Auto-assign center based on waste type
  const centerId = WASTE_TYPE_CENTER_MAP[data.waste_type] || 'ctr-001';
  const center = processingCenters.find(c => c.id === centerId);

  const entry = {
    id: uuidv4(),
    tracking_code,
    waste_type: data.waste_type,
    item_description: data.item_description,
    quantity: data.quantity || 1,
    unit: data.unit || 'units',
    weight_kg: data.weight_kg,
    hazard_level: data.hazard_level || 'medium',
    source: data.source,
    assigned_center_id: center ? center.id : null,
    assigned_center_name: center ? center.name : 'Unassigned - Manual Review Required',
    status: 'logged',
    logged_at: new Date().toISOString(),
    received_at: null,
    processed_at: null,
    compliance_notes: data.compliance_notes || '',
    environmental_impact: `Prevents ${(data.weight_kg * 0.3).toFixed(1)}kg of toxic materials entering landfill`
  };

  ewasteLogs.push(entry);

  // Add to audit log
  auditLog.push({
    id: uuidv4(),
    action: 'ITEM_LOGGED',
    tracking_code,
    ewaste_id: entry.id,
    performed_by: data.logged_by || 'System',
    timestamp: new Date().toISOString(),
    details: `Logged ${data.quantity || 1} ${data.unit || 'unit(s)'} of ${data.waste_type} from ${data.source?.name || 'Unknown'}`
  });

  if (center) {
    auditLog.push({
      id: uuidv4(),
      action: 'CENTER_ASSIGNED',
      tracking_code,
      ewaste_id: entry.id,
      performed_by: 'Auto-Router',
      timestamp: new Date().toISOString(),
      details: `Auto-assigned to ${center.name} based on waste type: ${data.waste_type}`
    });
  }

  return { entry, assigned_center: center };
};

const updateStatus = (id, status, updatedBy) => {
  const log = ewasteLogs.find(l => l.id === id || l.tracking_code === id);
  if (!log) return null;

  const oldStatus = log.status;
  log.status = status;
  if (status === 'received') log.received_at = new Date().toISOString();
  if (status === 'processed') log.processed_at = new Date().toISOString();

  auditLog.push({
    id: uuidv4(),
    action: 'STATUS_UPDATED',
    tracking_code: log.tracking_code,
    ewaste_id: log.id,
    performed_by: updatedBy || 'System',
    timestamp: new Date().toISOString(),
    details: `Status changed from '${oldStatus}' to '${status}'`
  });

  return log;
};

const getCenters = (wasteType) => {
  if (wasteType) {
    return processingCenters.filter(c => c.accepts.includes(wasteType));
  }
  return processingCenters;
};

const getAuditLog = (trackingCode) => {
  if (trackingCode) return auditLog.filter(a => a.tracking_code === trackingCode);
  return auditLog;
};

const generateReport = () => {
  const total = ewasteLogs.length;
  const byStatus = ewasteLogs.reduce((acc, l) => {
    acc[l.status] = (acc[l.status] || 0) + 1;
    return acc;
  }, {});
  const byType = ewasteLogs.reduce((acc, l) => {
    acc[l.waste_type] = (acc[l.waste_type] || 0) + 1;
    return acc;
  }, {});
  const byHazard = ewasteLogs.reduce((acc, l) => {
    acc[l.hazard_level] = (acc[l.hazard_level] || 0) + 1;
    return acc;
  }, {});
  const totalWeight = ewasteLogs.reduce((sum, l) => sum + (l.weight_kg || 0), 0);

  return {
    report_generated_at: new Date().toISOString(),
    summary: {
      total_items_logged: total,
      total_weight_kg: totalWeight,
      estimated_co2_saved_kg: (totalWeight * 0.5).toFixed(2),
      by_status: byStatus,
      by_waste_type: byType,
      by_hazard_level: byHazard
    },
    compliance: {
      audit_entries: auditLog.length,
      centers_active: processingCenters.length,
      chain_of_custody: 'All items tracked from source to processing center'
    }
  };
};

module.exports = {
  getAllLogs,
  getLogById,
  logEwaste,
  updateStatus,
  getCenters,
  getAuditLog,
  generateReport,
  HAZARD_LEVELS
};
