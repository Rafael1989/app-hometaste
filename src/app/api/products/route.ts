import { NextRequest, NextResponse } from 'next/server';
import { Product, ApiResponse, PaginatedResponse } from '@/lib/types';

// Simulação de banco de dados em memória (substituir por banco real)
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

// GET /api/products - Listar todos os produtos
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '10');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    let filteredProducts = [...products];

    // Filtrar por categoria
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    // Filtrar por busca
    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Paginação
    const total = filteredProducts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    const response: PaginatedResponse<Product> = {
      data: paginatedProducts,
      total,
      page,
      pageSize,
      totalPages,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}

// POST /api/products - Criar novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      price: body.price,
      category: body.category,
      imageUrl: body.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
      stock: body.stock || 0,
      chefId: body.chefId || 'default',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);

    const response: ApiResponse<Product> = {
      success: true,
      data: newProduct,
      message: 'Produto criado com sucesso',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar produto' },
      { status: 500 }
    );
  }
}
