"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSubcategories } from '../../../utils/api';
import { SubcategoryCard } from '../../../components/SubcategoryCard';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId?: string }>(); // categoryId can be undefined
  const [subcategories, setSubcategories] = useState<any>([]);

  useEffect(() => {
    if (!categoryId) {
      // Handle case where categoryId is undefined
      // For example, you might want to show an error message or redirect the user
      console.error('Category ID is undefined');
      return;
    }

    const loadSubcategories = async () => {
      const data = await fetchSubcategories(categoryId); // categoryId is now a string
      setSubcategories(data);
    };
    loadSubcategories();
  }, [categoryId]);

  return (
    <div>
      <h3>Subcategories</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {subcategories.map((subcategory: any) => (
          <SubcategoryCard key={subcategory.id} subcategory={subcategory} />
        ))}
      </div>
    </div>
  );
}
