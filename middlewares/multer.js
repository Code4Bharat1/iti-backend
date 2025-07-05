import multer from 'multer';
import path from 'path';

// Define storage
const storage = multer.diskStorage({
  destination: './public/uploads',   // Keep files inside /public/uploads
  filename: (req, file, cb) => {
    // Save with timestamp to avoid name conflicts
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create upload middleware
export const upload = multer({ storage });
