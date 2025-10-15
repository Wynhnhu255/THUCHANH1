import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/db';

// GET /api/products - Lấy tất cả sản phẩm
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let products = getAllProducts();

    // Filter by category if provided
    if (category) {
      products = products.filter(p => p.category === category);
    }

    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy danh sách sản phẩm'
    }, { status: 500 });
  }
}
