import React from 'react';
import Link from 'next/link';

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h6>{product.name}</h6>
      <p>Price: ${product.price}</p>
      <Link href={`/products/${product.id}`}>
        <button>View Product Details</button>
      </Link>
    </div>
  );
};
