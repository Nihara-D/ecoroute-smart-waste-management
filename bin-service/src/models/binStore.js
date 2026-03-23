const { v4: uuidv4 } = require('uuid');

// In-memory data store for bins
let bins = [
  {
    id: 'bin-001',
    name: 'Bin Alpha - Main Street',
    location: { lat: 6.9271, lng: 79.8612, address: '45 Main Street, Colombo 01' },
    type: 'general',
    capacity_liters: 240,
    fill_level: 85,
    status: 'full',
    last_updated: new Date('2026-03-23T08:00:00Z').toISOString(),
    sensor_id: 'SENS-001',
    zone: 'Zone-A'
  },
  {
    id: 'bin-002',
    name: 'Bin Beta - Park Ave',
    location: { lat: 6.9319, lng: 79.8478, address: '12 Park Avenue, Colombo 03' },
    type: 'recyclable',
    capacity_liters: 120,
    fill_level: 45,
    status: 'active',
    last_updated: new Date('2026-03-23T09:30:00Z').toISOString(),
    sensor_id: 'SENS-002',
    zone: 'Zone-B'
  },
  {
    id: 'bin-003',
    name: 'Bin Gamma - Harbor Rd',
    location: { lat: 6.9388, lng: 79.8491, address: '8 Harbor Road, Colombo 02' },
    type: 'organic',
    capacity_liters: 360,
    fill_level: 92,
    status: 'full',
    last_updated: new Date('2026-03-23T07:15:00Z').toISOString(),
    sensor_id: 'SENS-003',
    zone: 'Zone-A'
  },
  {
    id: 'bin-004',
    name: 'Bin Delta - University Rd',
    location: { lat: 6.9145, lng: 79.9725, address: '20 University Road, Nugegoda' },
    type: 'general',
    capacity_liters: 240,
    fill_level: 20,
    status: 'active',
    last_updated: new Date('2026-03-23T10:00:00Z').toISOString(),
    sensor_id: 'SENS-004',
    zone: 'Zone-C'
  }
];

// Notification log for threshold triggers
let notifications = [];

const getBins = () => bins;

const getBinById = (id) => bins.find(b => b.id === id);

const createBin = (binData) => {
  const newBin = {
    id: uuidv4(),
    ...binData,
    fill_level: binData.fill_level || 0,
    status: 'active',
    last_updated: new Date().toISOString()
  };
  bins.push(newBin);
  return newBin;
};

const updateFillLevel = (id, fill_level) => {
  const bin = bins.find(b => b.id === id);
  if (!bin) return null;

  bin.fill_level = fill_level;
  bin.last_updated = new Date().toISOString();

  // Threshold Trigger Logic: if fill_level >= 80%, mark as full and create notification
  if (fill_level >= 80) {
    bin.status = 'full';
    const notification = {
      id: uuidv4(),
      bin_id: id,
      bin_name: bin.name,
      fill_level,
      zone: bin.zone,
      triggered_at: new Date().toISOString(),
      message: `ALERT: Bin ${bin.name} has reached ${fill_level}% capacity. Collection required.`,
      dispatched: false
    };
    notifications.push(notification);
    return { bin, notification, threshold_triggered: true };
  } else {
    bin.status = fill_level < 10 ? 'empty' : 'active';
    return { bin, threshold_triggered: false };
  }
};

const getFullBins = () => bins.filter(b => b.fill_level >= 80);

const getNotifications = () => notifications;

const deleteBin = (id) => {
  const index = bins.findIndex(b => b.id === id);
  if (index === -1) return false;
  bins.splice(index, 1);
  return true;
};

module.exports = {
  getBins,
  getBinById,
  createBin,
  updateFillLevel,
  getFullBins,
  getNotifications,
  deleteBin
};
