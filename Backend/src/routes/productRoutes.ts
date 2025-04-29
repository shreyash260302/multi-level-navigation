import { Router } from 'express';
import { ProductController } from '../controllers/productController';

const router = Router();

// GET /products/:productId - Fetch product details by product ID
router.get('/:productId', (req, res, next) => {
  ProductController.getProductById(req, res).catch(next);
});

// GET products/subcategory/:subcategoryId/products - Fetch all products under a specific subcategory
router.get('/subcategory/:subcategoryId', (req, res) => ProductController.getProductsBySubcategory(req, res));

export default router;
