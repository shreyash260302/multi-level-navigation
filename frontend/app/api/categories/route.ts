import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Attempting to fetch categories from backend');
    
    const response = await fetch('http://localhost:4000/categories', {
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Successfully fetched categories:', data);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Detailed error fetching categories:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch categories',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}



