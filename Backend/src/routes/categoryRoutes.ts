import { Router } from 'express';
import { CategoryController } from '../controllers/categoryController';

const router = Router();

// GET /categories - Fetch all top-level categories
router.get('/', CategoryController.getAllCategories);

export default router;
