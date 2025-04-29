import React from 'react';
import Link from 'next/link';

export const CategoryCard = ({ category }: { category: any }) => {
  return (
    <div>
      <h4>{category.name}</h4>
      <Link href={process.env.NEXT_PUBLIC_API_URL + `/subcategories/category/${category.id}`}>View Category</Link>
    </div>
  );
};