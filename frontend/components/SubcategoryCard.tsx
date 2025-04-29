import React from 'react';
import Link from 'next/link';

export const SubcategoryCard = ({ subcategory }: { subcategory: any }) => {
  return (
    <div>
      <h5>{subcategory.name}</h5>
      <Link href={`/subcategories/${subcategory.id}`}>View Subcategory</Link>
    </div>
  );
};
