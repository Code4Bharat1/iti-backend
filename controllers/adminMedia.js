// controllers/admin/mediaController.js

import Image from '../models/Image.js';
import Video from '../models/Video.js';
import Activity from '../models/Activity.js';

// Upload an image
export const uploadImage = async (req, res) => {
  const { imageUrl } = req.body;
  const adminId = req.adminId;

  try {
    const image = await Image.create({ url: imageUrl, uploadedBy: adminId });

    await Activity.create({
      user: 'admin',
      action: 'uploaded',
      section: 'image',
      dateTime: new Date(),
    });

    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload image', error: err.message });
  }
};

// Delete an image
export const deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Image.findByIdAndDelete(id);
    if (!image) return res.status(404).json({ message: 'Image not found' });

    await Activity.create({
      user: 'admin',
      action: 'deleted',
      section: 'image',
      dateTime: new Date(),
    });

    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete image', error: err.message });
  }
};

// Upload a video
export const uploadVideo = async (req, res) => {
  const { videoUrl } = req.body;
  const adminId = req.adminId;

  try {
    const video = await Video.create({ url: videoUrl, uploadedBy: adminId });

    await Activity.create({
      user: 'admin',
      action: 'uploaded',
      section: 'video',
      dateTime: new Date(),
    });

    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload video', error: err.message });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findByIdAndDelete(id);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    await Activity.create({
      user: 'admin',
      action: 'deleted',
      section: 'video',
      dateTime: new Date(),
    });

    res.status(200).json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete video', error: err.message });
  }
};
