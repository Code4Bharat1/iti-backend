import express from 'express';
import verifyAdmin from '../../middlewares/verifyAdmin.js';
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} from '../../controllers/admin/blogController.js';

const router = express.Router();

router.use(verifyAdmin);

router.post('/', createBlog);
router.get('/', getBlogs);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
