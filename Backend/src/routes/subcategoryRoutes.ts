import { Router } from 'express';
import { SubcategoryController } from '../controllers/subcategoryController';

const router = Router();

// GET /subcategories/category/:categoryId - Get all subcategories for a category
router.get('/category/:categoryId', (req, res, next) => {
  SubcategoryController.getSubcategories(req, res).catch(next);
});

export default router;
