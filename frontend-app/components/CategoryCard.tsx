import React from 'react';
import Link from 'next/link';

export const CategoryCard = ({ category }: { category: any }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h4>{category.name}</h4>
      <Link href={`/categories/${category.id}`}>
        <button>View Subcategories</button>
      </Link>
    </div>
  );
};
