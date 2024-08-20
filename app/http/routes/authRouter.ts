import express from 'express';
import * as authController from '../controllers/authController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';
import valiateRegisterUser from '../middlewares/userValidator/registerValidator.js';
import validateLoginUser from '../middlewares/userValidator/loginValidator.js';
import upload from '../../utilities/upload.js';

const router = express.Router();

router.post('/api/create-user', valiateRegisterUser, authController.createUser);
router.get('/api/protected', authMiddleware.authenticateUser, authController.protectedRoute);
router.post('/api/signin', validateLoginUser, authController.signInUser);
router.put('/api/user/:userId', authMiddleware.authenticateUser, authController.updateOneUser);
router.patch('/api/user/upload', upload.single('image'), authController.uploadUserImage)

export default router;