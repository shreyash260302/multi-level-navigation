export const validateCategory = (name: string) => {
    if (!name) {
      throw new Error('Category name is required');
    }
  };
  