import express from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} from '../controllers/adminBlog.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.use(verifyAdmin);


router.post('/', upload.single('image'), createBlog);
router.get('/', getBlogs);
router.put(
  '/:id',
  upload.single('image'),
  updateBlog
);
router.delete('/:id', deleteBlog);

export default router;
