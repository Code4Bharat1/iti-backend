import express from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import {
  uploadImage,
  deleteImage,
  uploadVideo,
  deleteVideo
} from '../controllers/adminMedia.js';

const router = express.Router();

router.use(verifyAdmin);

// Images
router.post('/images', uploadImage);
router.delete('/images/:id', deleteImage);

// Videos
router.post('/videos', uploadVideo);
router.delete('/videos/:id', deleteVideo);

export default router;
