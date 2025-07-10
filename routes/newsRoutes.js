import express from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import {
  createNews,
  getNews,
  updateNews,
  deleteNews
} from '../controllers/adminNews.js';

const router = express.Router();

router.use(verifyAdmin);

router.post('/', createNews);
router.get('/', getNews);
router.put('/:id', updateNews);
router.delete('/:id', deleteNews);

export default router;
