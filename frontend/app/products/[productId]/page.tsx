"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProductDetails } from '../../../utils/api';

export default function ProductPage() {
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState<any>(null);

  useEffect(() => {
    const loadProductDetails = async () => {
      if (!productId) return;
      const data = await fetchProductDetails(productId as string);
      setProductDetails(data);
    };
    loadProductDetails();
  }, [productId]);

  if (!productDetails) return <div>Loading...</div>;

  return (
    <div>
      <h2>{productDetails.name}</h2>
      <p>{productDetails.description}</p>
      <p>Price: ${productDetails.price}</p>
    </div>
  );
}
