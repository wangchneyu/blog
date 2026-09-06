import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    // Fallback if KV is not configured
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ views: 0 });
    }

    const views = await kv.get<number>(`views:${slug}`);
    return NextResponse.json({ views: views || 0 });
  } catch (error) {
    console.error('Failed to get views:', error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ views: 1 }); // Mock increment
    }

    const views = await kv.incr(`views:${slug}`);
    return NextResponse.json({ views });
  } catch (error) {
    console.error('Failed to increment views:', error);
    return NextResponse.json({ views: 0 }, { status: 500 });
  }
}
