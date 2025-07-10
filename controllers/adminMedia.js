// controllers/admin/mediaController.js

import Image from '../models/Image.js';
import Video from '../models/Video.js';
import Activity from '../models/Activity.js';
import Admin from '../models/Admin.js';



export const uploadImage = async (req, res) => {
  try {
    const adminId = await Admin.findById(req.adminId);
    if (!adminId) return res.status(404).json({ message: 'Admin not found' });

    // ✅ Now req.file has the uploaded file
    const file = req.file;
    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    // ✅ Build the real URL
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // ✅ Save it in DB
    const image = await Image.create({ imageUrl, uploadedBy: adminId });

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
//get images
export const getImage = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images)
  }
  catch (err) {
    res.status(500).json({message:'failed to fetch the image',error:err.message})
  }
}
export const getVideo=async(req,res)=>{
  try{
    const videos=await Video.find();
    res.status(200).json(videos);
  }
  catch(err){
    res.status(500).json({message:"failed to fetch the videos",error:err.message})
  }
}
// Upload a video


export const uploadVideo = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No video file uploaded' });
    }

    // Get adminId from middleware (you mentioned it's available in req.adminId)
    const admin = await Admin.findById(req.adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Save the relative path (served at /uploads/...)
    const videoUrl = `/uploads/${file.filename}`;

    const video = await Video.create({
      videoUrl,
      uploadedBy: admin._id, // or admin.name/email if you prefer
    });

    await Activity.create({
      user: 'admin',
      action: 'uploaded',
      section: 'video',
      dateTime: new Date(),
    });

    res.status(201).json(video);
  } catch (err) {
    console.error('Upload Error:', err);
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
