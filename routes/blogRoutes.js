import express from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} from '../controllers/adminBlog.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const router = express.Router();

// router.use(verifyAdmin);

router.post('/', upload.single('image'), verifyAdmin,createBlog);
router.get('/', getBlogs);
router.put('/:id', verifyAdmin,updateBlog);
router.delete('/:id', verifyAdmin,deleteBlog);

export default router;
