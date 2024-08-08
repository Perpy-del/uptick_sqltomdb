import express from 'express';
import * as authController from '../controllers/authController';
import * as authMiddleware from '../middlewares/authMiddleware';
import valiateRegisterUser from '../middlewares/userValidator/registerValidator';
import validateLoginUser from '../middlewares/userValidator/loginValidator';

const router = express.Router();

router.post('/api/create-user', valiateRegisterUser, authController.createUser);
router.get('/api/protected', authMiddleware.authenticateUser, authController.protectedRoute);
router.post('/api/signin', validateLoginUser, authController.signInUser);
router.put('/api/user/:userId', authMiddleware.authenticateUser, authController.updateOneUser);

export default router;