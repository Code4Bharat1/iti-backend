import express from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import {
  uploadImage,
  deleteImage,
  getImage,
  uploadVideo,
  deleteVideo
} from '../controllers/adminMedia.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.use(verifyAdmin);

// Images
router.post('/images',upload.single('image'), uploadImage);
router.delete('/images/:id', deleteImage);
router.get('/images',getImage);
// Videos
router.post('/videos', uploadVideo);
router.delete('/videos/:id', deleteVideo);

export default router;
