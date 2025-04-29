import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { categoryId: string } }) {
  try {
    const response = await fetch(`http://localhost:4000/subcategories/category/${params.categoryId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subcategories' },
      { status: 500 }
    );
  }
}
