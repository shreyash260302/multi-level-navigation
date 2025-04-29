"use client"
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchSubcategoriesByCategory } from '../../../utils/api';

interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
}

interface SubcategoryDetails {
  id: number;
  name: string;
  description?: string;
  products: Product[];
  categoryId: number;
}

export default function SubcategoryPage() {
  const { subcategoryId } = useParams();
  const [subcategoryDetails, setSubcategoryDetails] = useState<SubcategoryDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSubcategoryDetails = async () => {
      try {
        if (!subcategoryId) {
          throw new Error('Subcategory ID is required');
        }

        const id = Array.isArray(subcategoryId) ? subcategoryId[0] : subcategoryId;
        console.log('Fetching details for subcategory:', id);
        
        const response = await fetchSubcategoriesByCategory(id);
        console.log('Raw API Response:', JSON.stringify(response, null, 2));

        // Step-by-step validation with detailed error messages
        if (!response) {
          throw new Error('No response received from API');
        }

        if (typeof response !== 'object') {
          throw new Error(`Invalid response type: ${typeof response}`);
        }

        // Validate each required field individually
        const validationErrors: string[] = [];

        if (!response.id) validationErrors.push('Missing id');
        if (!response.name) validationErrors.push('Missing name');
        if (!response.categoryId) validationErrors.push('Missing categoryId');
        if (!Array.isArray(response.products)) validationErrors.push('Products must be an array');

        if (validationErrors.length > 0) {
          throw new Error(`Data validation failed: ${validationErrors.join(', ')}`);
        }

        // Safely transform products with type checking
        const validatedProducts = response.products.map((product: any, index: number) => {
          const productErrors: string[] = [];
          
          if (!product.id) productErrors.push('id');
          if (!product.name) productErrors.push('name');
          if (typeof product.price !== 'number') productErrors.push('price');

          if (productErrors.length > 0) {
            throw new Error(`Product at index ${index} is missing required fields: ${productErrors.join(', ')}`);
          }

          return {
            id: product.id,
            name: product.name,
            price: product.price,
            description: product.description || undefined
          };
        });

        // Create validated data object
        const validatedData: SubcategoryDetails = {
          id: response.id,
          name: response.name,
          description: response.description || undefined,
          products: validatedProducts,
          categoryId: response.categoryId
        };

        setSubcategoryDetails(validatedData);
      } catch (err) {
        console.error('Error in loadSubcategoryDetails:', err);
        setError(err instanceof Error ? err.message : 'Failed to load subcategory details');
      } finally {
        setLoading(false);
      }
    };

    loadSubcategoryDetails();
  }, [subcategoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h3>Error Loading Subcategory</h3>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!subcategoryDetails) {
    return (
      <div className="not-found-container">
        <h3>Subcategory Not Found</h3>
        <p>The requested subcategory could not be found.</p>
      </div>
    );
  }

  return (
    <div className="subcategory-page">
      <div className="subcategory-header">
        <h2>{subcategoryDetails.name}</h2>
        {subcategoryDetails.description && (
          <p className="subcategory-description">{subcategoryDetails.description}</p>
        )}
      </div>

      <div className="products-grid">
        {subcategoryDetails.products.length === 0 ? (
          <p className="no-products">No products available in this subcategory.</p>
        ) : (
          subcategoryDetails.products.map((product) => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p className="price">${product.price.toFixed(2)}</p>
              {product.description && (
                <p className="description">{product.description}</p>
              )}
              <button 
                onClick={() => window.location.href = `/products/${product.id}`}
                className="view-details-btn"
              >
                View Details
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
