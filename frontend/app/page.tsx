"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchCategories } from '../utils/api';
import { CategoryCard } from '../components/CategoryCard';

export default function HomePage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      const data = await fetchCategories("");
      setCategories(data);
    };
    loadCategories();
  }, []);

  return (
    <div>
      <h2>Browse Categories</h2>
      <div>
        {categories.map((category: any) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

