import express from 'express';
import {
    createCategoryController,
    getCategoryController,
    getCategoryForAdminController,
    updateCategoryController,
    updateCategoryStatusController
} from '../controller/category.controller.js';
import validate from '../middleware/validate.js';
import { categorySchema, updateCategorySchema, updateCategoryStatusSchema } from '../validators/category.validator.js';
import authenticate from '../middleware/authenticate.js';
import authorize from '../middleware/authorize.js';
import { idParamSchema } from '../validators/common.validator.js';
const router = express.Router();

router.use(authenticate);
router.post('/', validate(categorySchema), authorize('admin'), createCategoryController);
router.get('/', getCategoryController);
router.get('/admin', authorize('admin'), getCategoryForAdminController);
router.patch('/:id', validate(idParamSchema, 'params'), authorize('admin'), validate(updateCategorySchema), updateCategoryController);
router.patch('/:id/status', validate(idParamSchema, 'params'), authorize('admin'), validate(updateCategoryStatusSchema), updateCategoryStatusController)
export default router;