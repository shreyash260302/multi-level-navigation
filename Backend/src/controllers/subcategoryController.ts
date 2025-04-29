import { Request, Response } from 'express';
import { SubcategoryService } from '../services/subcategoryService';

export class SubcategoryController {
  static async getSubcategories(req: Request<{ categoryId: string }>, res: Response) {
    const { categoryId } = req.params;
    try {
      const subcategories = await SubcategoryService.getSubcategoriesByCategory(categoryId);
      res.json(subcategories);
    } catch (error) {
      res.status(500).json({ 
        message: 'Error fetching subcategories',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}
