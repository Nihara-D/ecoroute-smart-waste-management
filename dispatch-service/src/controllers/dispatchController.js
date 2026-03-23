const store = require('../models/dispatchStore');

const getActiveTasks = (req, res) => {
  const tasks = store.getActiveTasks();
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

const getAllTasks = (req, res) => {
  const tasks = store.getTasks();
  res.json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

const getAllTrucks = (req, res) => {
  const trucks = store.getTrucks();
  const { status } = req.query;
  const filtered = status ? trucks.filter(t => t.status === status) : trucks;
  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
};

const assignDispatch = (req, res) => {
  const { bins, notes } = req.body;

  if (!bins || !Array.isArray(bins) || bins.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'bins array is required with at least one bin'
    });
  }

  const result = store.assignTask(bins, notes);

  if (result.error) {
    return res.status(503).json({
      success: false,
      message: result.error
    });
  }

  res.status(201).json({
    success: true,
    message: 'Collection task assigned successfully',
    data: {
      task: result.task,
      assigned_truck: result.truck
    }
  });
};

const completeTask = (req, res) => {
  const task = store.completeTask(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  res.json({
    success: true,
    message: 'Task marked as completed. Truck is now available.',
    data: task
  });
};

const getTaskById = (req, res) => {
  const task = store.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, message: 'Task not found' });
  }
  res.json({ success: true, data: task });
};

const getFleetStatus = (req, res) => {
  const trucks = store.getTrucks();
  const summary = {
    total: trucks.length,
    available: trucks.filter(t => t.status === 'available').length,
    on_route: trucks.filter(t => t.status === 'on-route').length,
    maintenance: trucks.filter(t => t.status === 'maintenance').length
  };
  res.json({
    success: true,
    fleet_summary: summary,
    data: trucks
  });
};

module.exports = {
  getActiveTasks,
  getAllTasks,
  getAllTrucks,
  assignDispatch,
  completeTask,
  getTaskById,
  getFleetStatus
};
