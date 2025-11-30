import { NextRequest, NextResponse } from 'next/server';
import { Product, ApiResponse } from '@/lib/types';

// Simulação de banco de dados
let products: Product[] = [
  {
    id: '1',
    name: 'Feijoada Completa',
    description: 'Feijoada tradicional com todos os acompanhamentos',
    price: 45.90,
    category: 'Brasileira',
    imageUrl: 'https://images.unsplash.com/photo-1628294895950-9805252327bc?w=400&h=300&fit=crop',
    stock: 10,
    chefId: 'chef1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Lasanha Bolonhesa',
    description: 'Lasanha caseira com molho bolonhesa e queijo',
    price: 38.50,
    category: 'Italiana',
    imageUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
    stock: 15,
    chefId: 'chef2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Moqueca de Peixe',
    description: 'Moqueca capixaba com peixe fresco e temperos especiais',
    price: 52.00,
    category: 'Brasileira',
    imageUrl: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
    stock: 8,
    chefId: 'chef1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET /api/products/[id] - Buscar produto por ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = products.find(p => p.id === params.id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    const response: ApiResponse<Product> = {
      success: true,
      data: product,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar produto' },
      { status: 500 }
    );
  }
}

// PUT /api/products/[id] - Atualizar produto
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const index = products.findIndex(p => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    products[index] = {
      ...products[index],
      ...body,
      id: params.id,
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<Product> = {
      success: true,
      data: products[index],
      message: 'Produto atualizado com sucesso',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar produto' },
      { status: 500 }
    );
  }
}

// DELETE /api/products/[id] - Deletar produto
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const index = products.findIndex(p => p.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: 'Produto não encontrado' },
        { status: 404 }
      );
    }

    products.splice(index, 1);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Produto deletado com sucesso',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao deletar produto:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar produto' },
      { status: 500 }
    );
  }
}
