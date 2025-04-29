import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class CategoryService {
  static async getAllCategories() {
    try {
      return await prisma.category.findMany({
        include: {
          subcategories: true
        }
      });
    } catch (error) {
      console.error('Database error in getAllCategories:', error);
      throw error;
    }
  }
}
