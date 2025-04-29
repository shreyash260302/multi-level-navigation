"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchCategories } from '../../../utils/api';
import { SubcategoryCard } from '../../../components/SubcategoryCard';

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [categoryDetails, setCategoryDetails] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategoryDetails = async () => {
      try {
        if (!categoryId) throw new Error("Category ID is required");
        console.log('Fetching category details for ID:', categoryId);
        const data = await fetchCategories(categoryId as string);
        console.log('Received category details:', data);
        setCategoryDetails(data);
      } catch (err) {
        console.error('Error loading category:', err);
        setError(err instanceof Error ? err.message : 'Failed to load category');
      }
    };
    loadCategoryDetails();
  }, [categoryId]);

  if (error) return <div>Error: {error}</div>;
  if (!categoryDetails) return <div>Loading...</div>;

  return (
    <div>
      <h3>{categoryDetails.name}</h3>
      <div>
        {categoryDetails.subcategories?.map((subcategory: any) => (
          <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
        ))}
      </div>
    </div>
  );
}
