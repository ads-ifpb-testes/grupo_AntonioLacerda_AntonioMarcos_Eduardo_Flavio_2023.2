import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/:email', authMiddleware, UserController.show);
router.post('/', UserController.create);
router.put('/:email', authMiddleware, UserController.update);
router.delete('/:email', authMiddleware, UserController.destroy);

export default router;
