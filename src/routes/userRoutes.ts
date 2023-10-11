import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();

router.get('/:email', UserController.show);
router.post('/', UserController.create);
router.put('/:email', UserController.update);
router.delete('/:email', UserController.destroy);

export default router;
