const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`);
  return await response.json();
};

export const fetchSubcategories = async (categoryId: string) => {
  const response = await fetch(`${API_BASE_URL}/subcategories/category/${categoryId}`);
  return await response.json();
};

export const fetchProducts = async (subcategoryId: string) => {
  const response = await fetch(`${API_BASE_URL}/products/subcategory/${subcategoryId}`);
  return await response.json();
};

export const fetchProductDetails = async (productId: string) => {
  const response = await fetch(`${API_BASE_URL}/products/${productId}`);
  return await response.json();
};
