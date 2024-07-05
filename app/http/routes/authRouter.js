const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const valiateRegisterUser = require('../middlewares/userValidator/registerValidator');
const validateLoginUser = require('../middlewares/userValidator/loginValidator');

router.post('/api/create-user', valiateRegisterUser, authController.createUser);
router.get('/api/protected', authMiddleware.authenticateUser, authController.protectedRoute);
router.post('/api/signin', validateLoginUser, authController.signInUser);

module.exports = router;