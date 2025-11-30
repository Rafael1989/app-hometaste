import { NextRequest, NextResponse } from 'next/server';
import { Order, ApiResponse } from '@/lib/types';

// Simulação de banco de dados
let orders: Order[] = [];

// GET /api/orders/[id] - Buscar pedido por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = orders.find(o => o.id === params.id);

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Order> = {
      success: true,
      data: order,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar pedido' },
      { status: 500 }
    );
  }
}

// PATCH /api/orders/[id] - Atualizar status do pedido
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = orders.findIndex(o => o.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Pedido não encontrado' },
        { status: 404 }
      );
    }

    orders[index] = {
      ...orders[index],
      status: body.status,
      deliveryId: body.deliveryId,
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<Order> = {
      success: true,
      data: orders[index],
      message: 'Pedido atualizado com sucesso',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar pedido' },
      { status: 500 }
    );
  }
}
