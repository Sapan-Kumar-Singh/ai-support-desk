import express from 'express';
import authRoutes from './auth.routes.js';
import caetgoryRoutes from './category.routes.js';
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/category', caetgoryRoutes);
export default router;