'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Truck, 
  MapPin, 
  DollarSign, 
  Star, 
  Navigation,
  Clock,
  Package,
  CheckCircle
} from 'lucide-react';

export default function DeliveryDashboard() {
  const [isAvailable, setIsAvailable] = useState(true);
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'history'>('available');

  // Mock data
  const stats = {
    totalDeliveries: 342,
    totalEarnings: 4280.00,
    averageRating: 4.9,
    completedToday: 8,
    distanceTraveled: 45.2
  };

  const availableDeliveries = [
    {
      id: '1',
      orderNumber: '#1234',
      pickup: {
        name: 'Maria Silva',
        address: 'Rua das Flores, 123 - Copacabana',
        distance: 1.2
      },
      delivery: {
        name: 'João Costa',
        address: 'Av. Atlântica, 456 - Copacabana',
        distance: 2.5
      },
      fee: 8.50,
      estimatedTime: 15
    },
    {
      id: '2',
      orderNumber: '#1235',
      pickup: {
        name: 'Ana Oliveira',
        address: 'Rua Visconde, 789 - Ipanema',
        distance: 2.8
      },
      delivery: {
        name: 'Pedro Santos',
        address: 'Rua Farme, 321 - Leblon',
        distance: 3.5
      },
      fee: 12.00,
      estimatedTime: 20
    }
  ];

  const activeDelivery = {
    id: '3',
    orderNumber: '#1233',
    status: 'picking_up' as const,
    pickup: {
      name: 'Joana Santos',
      address: 'Rua Barata Ribeiro, 555 - Copacabana',
      phone: '(21) 99999-9999'
    },
    delivery: {
      name: 'Carlos Lima',
      address: 'Av. Nossa Senhora, 888 - Copacabana',
      phone: '(21) 98888-8888'
    },
    fee: 10.00
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-xl">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Entregador</h1>
                <p className="text-sm text-gray-600">Bem-vindo, Carlos Mendes</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  {isAvailable ? 'Disponível' : 'Indisponível'}
                </span>
                <button
                  onClick={() => setIsAvailable(!isAvailable)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isAvailable ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isAvailable ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Entregas</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDeliveries}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Ganhos</p>
                <p className="text-2xl font-bold text-gray-900">R$ {stats.totalEarnings.toFixed(0)}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avaliação</p>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedToday}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-xl">
                <CheckCircle className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Distância</p>
                <p className="text-2xl font-bold text-gray-900">{stats.distanceTraveled} km</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-xl">
                <Navigation className="w-5 h-5 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('available')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'available'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Disponíveis ({availableDeliveries.length})
          </button>
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'active'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Em Andamento
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'history'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Histórico
          </button>
        </div>

        {/* Available Deliveries */}
        {activeTab === 'available' && (
          <div className="space-y-4">
            {!isAvailable && (
              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <p className="text-center text-yellow-800">
                  Você está indisponível. Ative seu status para receber entregas.
                </p>
              </Card>
            )}
            {availableDeliveries.map((delivery) => (
              <Card key={delivery.id} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800">
                        {delivery.orderNumber}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        {delivery.pickup.distance + delivery.delivery.distance} km total
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">R$ {delivery.fee.toFixed(2)}</p>
                    <p className="text-sm text-gray-600">~{delivery.estimatedTime} min</p>
                  </div>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 p-2 rounded-lg mt-1">
                      <MapPin className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Retirada</p>
                      <p className="text-sm text-gray-600">{delivery.pickup.name}</p>
                      <p className="text-sm text-gray-500">{delivery.pickup.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Entrega</p>
                      <p className="text-sm text-gray-600">{delivery.delivery.name}</p>
                      <p className="text-sm text-gray-500">{delivery.delivery.address}</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                  disabled={!isAvailable}
                >
                  Aceitar Entrega
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Active Delivery */}
        {activeTab === 'active' && (
          <Card className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-blue-100 text-blue-800 text-lg px-4 py-2">
                  {activeDelivery.orderNumber}
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800">
                  Coletando pedido
                </Badge>
              </div>
              <p className="text-2xl font-bold text-green-600 mb-2">R$ {activeDelivery.fee.toFixed(2)}</p>
            </div>

            <div className="space-y-6 mb-6">
              <div className="bg-orange-50 p-4 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-orange-500 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Retirada</p>
                    <p className="text-sm text-gray-700">{activeDelivery.pickup.name}</p>
                    <p className="text-sm text-gray-600">{activeDelivery.pickup.address}</p>
                    <p className="text-sm text-gray-600 mt-1">{activeDelivery.pickup.phone}</p>
                  </div>
                </div>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <Navigation className="w-4 h-4 mr-2" />
                  Abrir Rota
                </Button>
              </div>

              <div className="bg-green-50 p-4 rounded-xl">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-green-500 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 mb-1">Entrega</p>
                    <p className="text-sm text-gray-700">{activeDelivery.delivery.name}</p>
                    <p className="text-sm text-gray-600">{activeDelivery.delivery.address}</p>
                    <p className="text-sm text-gray-600 mt-1">{activeDelivery.delivery.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirmar Coleta
            </Button>
          </Card>
        )}

        {/* History */}
        {activeTab === 'history' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Histórico de Entregas</h2>
            <p className="text-gray-600">Histórico completo aparecerá aqui...</p>
          </Card>
        )}
      </main>
    </div>
  );
}
