const { v4: uuidv4 } = require('uuid');

// Fleet of garbage trucks
let trucks = [
  {
    id: 'truck-001',
    plate: 'WP-CAA-1234',
    driver: 'Kamal Perera',
    driver_phone: '+94771234567',
    capacity_liters: 5000,
    current_load: 0,
    status: 'available',
    current_location: { lat: 6.9271, lng: 79.8612 },
    zone: 'Zone-A'
  },
  {
    id: 'truck-002',
    plate: 'WP-CBB-5678',
    driver: 'Nimal Silva',
    driver_phone: '+94779876543',
    capacity_liters: 4000,
    current_load: 1200,
    status: 'on-route',
    current_location: { lat: 6.9319, lng: 79.8478 },
    zone: 'Zone-B'
  },
  {
    id: 'truck-003',
    plate: 'WP-CCC-9012',
    driver: 'Sunil Jayawardena',
    driver_phone: '+94761122334',
    capacity_liters: 6000,
    current_load: 0,
    status: 'available',
    current_location: { lat: 6.9145, lng: 79.9725 },
    zone: 'Zone-C'
  }
];

// Collection tasks
let tasks = [
  {
    id: 'task-001',
    truck_id: 'truck-002',
    bin_ids: ['bin-002'],
    status: 'in-progress',
    priority: 'high',
    assigned_at: new Date('2026-03-23T08:30:00Z').toISOString(),
    estimated_completion: new Date('2026-03-23T10:30:00Z').toISOString(),
    completed_at: null,
    route_summary: 'Zone-B Collection Run',
    total_bins: 1,
    notes: 'Auto-assigned from threshold alert'
  }
];

// Route optimization: calculate simple Euclidean distance
const calculateDistance = (loc1, loc2) => {
  const dx = loc1.lat - loc2.lat;
  const dy = loc1.lng - loc2.lng;
  return Math.sqrt(dx * dx + dy * dy);
};

// Find nearest available truck to a given location
const findNearestAvailableTruck = (location) => {
  const available = trucks.filter(t => t.status === 'available');
  if (available.length === 0) return null;

  return available.reduce((nearest, truck) => {
    const d = calculateDistance(truck.current_location, location);
    const dn = calculateDistance(nearest.current_location, location);
    return d < dn ? truck : nearest;
  });
};

const getTrucks = () => trucks;
const getTruckById = (id) => trucks.find(t => t.id === id);

const getTasks = () => tasks;
const getTaskById = (id) => tasks.find(t => t.id === id);
const getActiveTasks = () => tasks.filter(t => t.status !== 'completed');

const assignTask = (binData, notes) => {
  // Find nearest available truck
  const location = binData[0]?.location || { lat: 6.9271, lng: 79.8612 };
  const truck = findNearestAvailableTruck(location);

  if (!truck) return { error: 'No trucks available' };

  // Update truck status
  truck.status = 'on-route';

  const task = {
    id: uuidv4(),
    truck_id: truck.id,
    truck_plate: truck.plate,
    driver: truck.driver,
    bin_ids: binData.map(b => b.id),
    bins: binData,
    status: 'in-progress',
    priority: binData.some(b => b.fill_level >= 90) ? 'urgent' : 'high',
    assigned_at: new Date().toISOString(),
    estimated_completion: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    completed_at: null,
    route_summary: `Optimized collection: ${binData.length} bin(s) in route`,
    total_bins: binData.length,
    notes: notes || 'Auto-dispatched via optimization engine',
    optimization_notes: `Nearest truck (${truck.plate}) selected. Distance: ${calculateDistance(truck.current_location, location).toFixed(4)} units`
  };

  tasks.push(task);
  return { task, truck };
};

const completeTask = (id) => {
  const task = tasks.find(t => t.id === id);
  if (!task) return null;

  task.status = 'completed';
  task.completed_at = new Date().toISOString();

  // Free up the truck
  const truck = trucks.find(t => t.id === task.truck_id);
  if (truck) {
    truck.status = 'available';
    truck.current_load = 0;
  }

  return task;
};

module.exports = {
  getTrucks,
  getTruckById,
  getTasks,
  getTaskById,
  getActiveTasks,
  assignTask,
  completeTask,
  findNearestAvailableTruck
};
