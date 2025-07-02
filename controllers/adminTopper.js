// controllers/admin/topperController.js

import Topper from '../models/Topper.js';
import Activity from '../models/Activity.js';

// Add a new topper
export const addTopper = async (req, res) => {
  const { studentName, trade, percentage } = req.body;
  const adminId = req.adminId;

  try {
    const topper = await Topper.create({
      studentName,
      trade,
      percentage,
      createdBy: adminId,
    });

    await Activity.create({
      user: 'admin',
      action: 'added',
      section: 'toppersList',
      dateTime: new Date(),
    });

    res.status(201).json(topper);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add topper', error: err.message });
  }
};

// Get all toppers
export const getToppers = async (req, res) => {
  try {
    const toppers = await Topper.find().sort({ percentage: -1 });
    res.status(200).json(toppers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch toppers', error: err.message });
  }
};

// Update topper
export const updateTopper = async (req, res) => {
  const { id } = req.params;
  const { studentName, trade, percentage } = req.body;

  try {
    const topper = await Topper.findByIdAndUpdate(
      id,
      { studentName, trade, percentage },
      { new: true }
    );

    if (!topper) return res.status(404).json({ message: 'Topper not found' });

    await Activity.create({
      user: 'admin',
      action: 'updated',
      section: 'toppersList',
      dateTime: new Date(),
    });

    res.status(200).json(topper);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update topper', error: err.message });
  }
};

// Delete topper
export const deleteTopper = async (req, res) => {
  const { id } = req.params;

  try {
    const topper = await Topper.findByIdAndDelete(id);
    if (!topper) return res.status(404).json({ message: 'Topper not found' });

    await Activity.create({
      user: 'admin',
      action: 'deleted',
      section: 'toppersList',
      dateTime: new Date(),
    });

    res.status(200).json({ message: 'Topper deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete topper', error: err.message });
  }
};
