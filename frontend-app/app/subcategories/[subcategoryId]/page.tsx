'use client'
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProducts } from '../../../utils/api';
import { ProductCard } from '../../../components/ProductCard';

export default function SubcategoryPage() {
  const { subcategoryId } = useParams<{ subcategoryId?: string }>();  // `subcategoryId` can be undefined
  const safeSubcategoryId = subcategoryId ?? '';  // Default to empty string if undefined
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    if (!safeSubcategoryId) {
      // Handle the case where `subcategoryId` is undefined, e.g., show an error or redirect
      console.error('Subcategory ID is missing');
      return;
    }

    const loadProducts = async () => {
      const data = await fetchProducts(safeSubcategoryId);  // safeSubcategoryId is guaranteed to be a string
      setProducts(data);
    };
    loadProducts();
  }, [safeSubcategoryId]);

  return (
    <div>
      <h3>Products</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
