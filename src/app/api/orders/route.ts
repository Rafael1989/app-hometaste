import { NextRequest, NextResponse } from 'next/server';
import { Order, ApiResponse, PaginatedResponse } from '@/lib/types';

// Simulação de banco de dados em memória
let orders: Order[] = [];

// GET /api/orders - Listar todos os pedidos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const status = searchParams.get('status');
    const customerId = searchParams.get('customerId');

    let filteredOrders = [...orders];

    // Filtrar por status
    if (status && status !== 'all') {
      filteredOrders = filteredOrders.filter(o => o.status === status);
    }

    // Filtrar por cliente
    if (customerId) {
      filteredOrders = filteredOrders.filter(o => o.customerId === customerId);
    }

    // Ordenar por data (mais recente primeiro)
    filteredOrders.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    // Paginação
    const total = filteredOrders.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

    const response: PaginatedResponse<Order> = {
      data: paginatedOrders,
      total,
      page,
      pageSize,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar pedidos' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Criar novo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Calcular total
    const total = body.products.reduce(
      (sum: number, item: any) => sum + (item.price * item.quantity),
      0
    );

    const newOrder: Order = {
      id: Date.now().toString(),
      customerId: body.customerId,
      products: body.products,
      total,
      status: 'pending',
      deliveryAddress: body.deliveryAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    orders.push(newOrder);

    const response: ApiResponse<Order> = {
      success: true,
      data: newOrder,
      message: 'Pedido criado com sucesso',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar pedido' },
      { status: 500 }
    );
  }
}
