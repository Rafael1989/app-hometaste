'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChefHat, 
  Plus, 
  Clock, 
  DollarSign, 
  Star, 
  Package,
  TrendingUp,
  Users,
  CheckCircle,
  XCircle
} from 'lucide-react';
import Link from 'next/link';

export default function ChefDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'dishes'>('overview');

  // Mock data
  const stats = {
    totalOrders: 156,
    totalEarnings: 8450.00,
    averageRating: 4.8,
    activeOrders: 3,
    completedToday: 5
  };

  const recentOrders = [
    {
      id: '1',
      customer: 'João Silva',
      dish: 'Feijoada Completa',
      status: 'preparing' as const,
      total: 45.00,
      time: '10 min atrás'
    },
    {
      id: '2',
      customer: 'Maria Santos',
      dish: 'Bobó de Camarão',
      status: 'ready' as const,
      total: 48.00,
      time: '25 min atrás'
    },
    {
      id: '3',
      customer: 'Pedro Costa',
      dish: 'Feijoada Completa',
      status: 'pending' as const,
      total: 45.00,
      time: '5 min atrás'
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { label: 'Pendente', className: 'bg-yellow-100 text-yellow-800' },
      preparing: { label: 'Preparando', className: 'bg-blue-100 text-blue-800' },
      ready: { label: 'Pronto', className: 'bg-green-100 text-green-800' },
      completed: { label: 'Entregue', className: 'bg-gray-100 text-gray-800' }
    };
    const variant = variants[status as keyof typeof variants] || variants.pending;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] p-2 rounded-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Cozinheira</h1>
                <p className="text-sm text-gray-600">Bem-vinda, Maria Silva</p>
              </div>
            </div>
            <Link href="/chef/dishes/new">
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF5722] hover:to-[#FF7733]">
                <Plus className="w-4 h-4 mr-2" />
                Novo Prato
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'overview'
                ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Visão Geral
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'orders'
                ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Pedidos
          </button>
          <button
            onClick={() => setActiveTab('dishes')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'dishes'
                ? 'text-[#FF6B35] border-b-2 border-[#FF6B35]'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Meus Pratos
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Total de Pedidos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-xl">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Ganhos Totais</p>
                    <p className="text-3xl font-bold text-gray-900">R$ {stats.totalEarnings.toFixed(2)}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Avaliação Média</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.averageRating}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-xl">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Pedidos Ativos</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeOrders}</p>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Pedidos Recentes</h2>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-white p-3 rounded-lg">
                        <Users className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.dish}</p>
                        <p className="text-xs text-gray-500 mt-1">{order.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-gray-900">R$ {order.total.toFixed(2)}</p>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex gap-2">
                        {order.status === 'pending' && (
                          <>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                              <XCircle className="w-4 h-4" />
                            </Button>
                          </>
                        )}
                        {order.status === 'preparing' && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Marcar Pronto
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Todos os Pedidos</h2>
            <p className="text-gray-600">Lista completa de pedidos aparecerá aqui...</p>
          </Card>
        )}

        {/* Dishes Tab */}
        {activeTab === 'dishes' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Meus Pratos</h2>
            <p className="text-gray-600">Lista de pratos cadastrados aparecerá aqui...</p>
          </Card>
        )}
      </main>
    </div>
  );
}
