
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
