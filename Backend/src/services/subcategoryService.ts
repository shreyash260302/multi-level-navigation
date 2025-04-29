import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class SubcategoryService {
  static async getSubcategoriesByCategory(categoryId: string) {
    return await prisma.subcategory.findMany({
      where: { categoryId: Number(categoryId) },
    });
  }
}
