"use client"
import React, { useEffect, useState } from 'react';
import { fetchCategories } from '../utils/api';
import { CategoryCard } from '../components/CategoryCard';

// Define the type for Category
interface Category {
  id: number;
  name: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);  // Define the state type

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories();
      setCategories(data);  // The response from fetchCategories should now be of type Category[]
    };
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Browse Categories</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
