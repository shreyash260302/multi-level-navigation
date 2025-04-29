import React from 'react';
import Link from 'next/link';

export const SubcategoryCard = ({ subcategory }: { subcategory: any }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h5>{subcategory.name}</h5>
      <Link href={`/subcategories/${subcategory.id}`}>
        <button>View Products</button>
      </Link>
    </div>
  );
};
