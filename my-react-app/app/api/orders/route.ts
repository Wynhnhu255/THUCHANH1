import { NextResponse } from 'next/server';
import { addOrder } from '@/lib/db';

// POST /api/orders - Tạo đơn hàng mới
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, total, userId } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({
        success: false,
        message: 'Giỏ hàng trống'
      }, { status: 400 });
    }

    const order = addOrder({
      userId,
      items,
      total,
      status: 'pending'
    });

    return NextResponse.json({
      success: true,
      data: order,
      message: 'Đặt hàng thành công'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: 'Lỗi khi tạo đơn hàng'
    }, { status: 500 });
  }
}
