// controllers/admin/noticeController.js

import Notice from '../models/Notice.js';
import Activity from '../models/Activity.js';

// Create a new notice
export const createNotice = async (req, res) => {
  const { user, description, date } = req.body;
  const adminId = req.adminId; // get from middleware (JWT)

  try {
    const notice = await Notice.create({
      user,
      description,
      date: date || new Date(),
      createdBy: adminId,
    });

    await Activity.create({
      user,
      action: 'created',
      section: 'notice',
      dateTime: new Date(),
    });

    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create notice', error: err.message });
  }
};

// Get all notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch notices', error: err.message });
  }
};

// Update a notice
export const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { user, description, date } = req.body;

  try {
    const notice = await Notice.findByIdAndUpdate(
      id,
      { user, description, date },
      { new: true }
    );

    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    await Activity.create({
      user,
      action: 'updated',
      section: 'notice',
      dateTime: new Date(),
    });

    res.status(200).json(notice);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update notice', error: err.message });
  }
};

// Delete a notice
export const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    const notice = await Notice.findByIdAndDelete(id);
    if (!notice) return res.status(404).json({ message: 'Notice not found' });

    await Activity.create({
      user: notice.user,
      action: 'deleted',
      section: 'notice',
      dateTime: new Date(),
    });

    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete notice', error: err.message });
  }
};
