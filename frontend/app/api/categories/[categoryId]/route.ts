import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    console.log(`Attempting to fetch category details for ID: ${params.categoryId}`);
    
    const response = await fetch(`http://localhost:4000/subcategories/${params.categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Backend error: Status ${response.status}, Body:`, errorText);
      
      if (response.status === 404) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
      
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched category details:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Detailed error fetching category details:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch category details',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

