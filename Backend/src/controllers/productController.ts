import { Request, Response } from 'express';
import { ProductService } from '../services/productService';

export class ProductController {
  static async getProductById(req: Request<{ productId: string }>, res: Response) {
    try {
      const { productId } = req.params;
      const product = await ProductService.getProductById(productId);
      
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      console.error('Error in getProductById:', error);
      res.status(500).json({ 
        message: 'Error fetching product',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  static async getProductsBySubcategory(req: Request<{ subcategoryId: string }>, res: Response) {
    try {
      const { subcategoryId } = req.params;
      const products = await ProductService.getProductsBySubcategory(subcategoryId);
      res.json(products);
    } catch (error) {
      console.error('Error in getProductsBySubcategory:', error);
      res.status(500).json({ 
        message: 'Error fetching products',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
