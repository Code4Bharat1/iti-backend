// middleware/multer.js
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../utils/cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blog_uploads', // change as needed
    allowed_formats: ['jpg', 'png', 'jpeg', 'avif', 'mp4', 'webm'],
    transformation: [{ width: 800, crop: 'scale' }],
  },
});

const parser = multer({ storage });

export default parser;
