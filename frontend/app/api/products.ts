import { NextResponse } from 'next/server';

// For fetching products by subcategory
export async function GET(request: Request, { params }: { params: { subcategoryId: string } }) {
  try {
    const response = await fetch(`http://localhost:4000/products/subcategory/${params.subcategoryId}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

// For fetching product details
export async function getProductDetails(productId: string) {
  try {
    const response = await fetch(`http://localhost:4000/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching product details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product details' },
      { status: 500 }
    );
  }
}
