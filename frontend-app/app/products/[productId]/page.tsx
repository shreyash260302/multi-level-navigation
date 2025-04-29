"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductDetails } from "../../../utils/api";

export default function ProductPage() {
  const { productId } = useParams<{ productId?: string }>(); // `productId` can be undefined
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If productId is not available, handle gracefully
    if (!productId) {
      setError("Product ID is missing");
      setLoading(false);
      return;
    }

    const loadProductDetails = async () => {
      try {
        const data = await fetchProductDetails(productId);
        setProduct(data);
      } catch (err) {
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [productId]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>{product?.name}</h2>
      <p>{product?.description || "No description available"}</p>
      <p>Price: ${product?.price}</p>
      <div>
        <h4>Product Attributes</h4>
        <ul>
          {/* Loop through productAttributes and display each */}
          {Object.entries(product?.productAttributes || {}).map(
            ([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
