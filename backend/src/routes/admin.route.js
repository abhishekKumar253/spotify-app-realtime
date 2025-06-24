import { Router } from 'express';
import {
  checkAdmin,
  craeteSong,
  createAlbum,
  deleteAlbum,
  deleteSong
} from '../controller/admin.controller.js';
import { protectRoute, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin)

router.get('/songs', craeteSong);
router.delete('/songs/:id', deleteSong);
router.post('/albums', createAlbum);
router.delete("/albums/:id", deleteAlbum)

export default router;
