import React from 'react';
import Link from 'next/link';

export const ProductCard = ({ product }: { product: any }) => {
  return (
    <div>
      <h6>{product.name}</h6>
      <p>{product.price}</p>
      <Link href={`/products/${product.id}`}>View Product</Link>
    </div>
  );
};
