import { NextResponse } from 'next/server';
import { getAllCategories } from '@/lib/db';

// GET /api/categories - Lấy tất cả categories
export async function GET() {
  try {
    const categories = getAllCategories();

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy danh sách danh mục'
    }, { status: 500 });
  }
}
