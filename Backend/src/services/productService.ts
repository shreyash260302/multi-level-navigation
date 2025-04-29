import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductService {
  static async getProductById(productId: string) {
    try {
      return await prisma.product.findUnique({
        where: { id: parseInt(productId) },
        include: {
          subcategory: true
        }
      });
    } catch (error) {
      console.error('Database error in getProductById:', error);
      throw error;
    }
  }

  static async getProductsBySubcategory(subcategoryId: string) {
    try {
      return await prisma.product.findMany({
        where: { subcategoryId: parseInt(subcategoryId) }
      });
    } catch (error) {
      console.error('Database error in getProductsBySubcategory:', error);
      throw error;
    }
  }
}
