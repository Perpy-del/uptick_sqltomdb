import express from 'express';

import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as blogController from '../controllers/blogController.js';
import validateNewBlog from '../middlewares/blogValidator/createBlogValidator.js';

const router = express.Router();

router.get('/api/posts', authMiddleware.authenticateUser, blogController.getAllBlogPosts);
router.get('/api/post/:blogId', authMiddleware.authenticateUser, blogController.getSinglePost);
router.post('/api/posts/create', authMiddleware.authenticateUser, validateNewBlog, blogController.createBlogPost);
router.put('/api/post/:blogId', authMiddleware.authenticateUser, blogController.updateBlogPost);
router.delete('/api/post/:blogId', authMiddleware.authenticateUser, blogController.deleteBlogPost);

export default router;