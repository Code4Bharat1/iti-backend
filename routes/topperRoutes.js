import express from 'express';
import verifyAdmin from '../middlewares/verifyAdmin.js';
import {
  addTopper,
  getToppers,
  updateTopper,
  deleteTopper
} from '../controllers/adminTopper.js';

const router = express.Router();

router.use(verifyAdmin);

// Images
router.post("/addTopper",addTopper);
router.get("/getTopper",getToppers);
router.put("/updateTopper/:id",updateTopper);
router.delete("/deleteTopper/:id",deleteTopper);
export default router;
