import { NextResponse } from 'next/server';
import { getProductById } from '@/lib/db';

type Props = {
  params: Promise<{ id: string }>;
};

// GET /api/products/:id - Lấy chi tiết sản phẩm theo ID
export async function GET(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const productId = parseInt(id);
    const product = getProductById(productId);

    if (!product) {
      return NextResponse.json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi lấy thông tin sản phẩm'
    }, { status: 500 });
  }
}
