'use client';

import { Dish } from '@/lib/types';
import { X, Star, Clock, MapPin, Home, Truck, User } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DishModal({ dish, isOpen, onClose }: DishModalProps) {
  const [selectedOption, setSelectedOption] = useState<'delivery' | 'eat-in'>('delivery');

  if (!isOpen || !dish) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com Imagem */}
        <div className="relative h-64 w-full">
          <Image
            src={dish.photo}
            alt={dish.name}
            fill
            className="object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4 bg-[#FF6B35] text-white px-4 py-2 rounded-full text-sm font-medium">
            {dish.category}
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-6">
          {/* Título e Preço */}
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex-1">
              {dish.name}
            </h2>
            <div className="text-3xl font-bold text-[#FF6B35] ml-4">
              R$ {dish.price.toFixed(2)}
            </div>
          </div>

          {/* Descrição */}
          <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
            {dish.description}
          </p>

          {/* Info da Cozinheira */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-4">
              <Image
                src={dish.chef.avatar}
                alt={dish.chef.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-[#FF6B35]" />
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {dish.chef.name}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{dish.chef.rating} ({dish.chef.totalReviews} avaliações)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{dish.chef.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Disponibilidade */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 text-center">
              <Clock className="w-5 h-5 text-[#FF6B35] mx-auto mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Tempo de preparo</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{dish.preparationTime} min</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 text-center">
              <MapPin className="w-5 h-5 text-[#FF6B35] mx-auto mb-2" />
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Distância</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{dish.chef.distance} km</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4 text-center">
              <div className="w-5 h-5 mx-auto mb-2 flex items-center justify-center text-[#FF6B35] font-bold">
                📅
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Disponível</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">{dish.availableDate}</p>
            </div>
          </div>

          {/* Opções de Entrega */}
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Como você quer receber?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {dish.deliveryAvailable && (
                <button
                  onClick={() => setSelectedOption('delivery')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedOption === 'delivery'
                      ? 'border-[#FF6B35] bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Truck className={`w-5 h-5 ${selectedOption === 'delivery' ? 'text-[#FF6B35]' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${selectedOption === 'delivery' ? 'text-[#FF6B35]' : 'text-gray-900 dark:text-gray-100'}`}>
                      Delivery
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Receba em casa
                    </p>
                  </div>
                </button>
              )}
              {dish.eatInAvailable && (
                <button
                  onClick={() => setSelectedOption('eat-in')}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedOption === 'eat-in'
                      ? 'border-[#FF6B35] bg-orange-50 dark:bg-orange-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <Home className={`w-5 h-5 ${selectedOption === 'eat-in' ? 'text-[#FF6B35]' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <p className={`font-medium ${selectedOption === 'eat-in' ? 'text-[#FF6B35]' : 'text-gray-900 dark:text-gray-100'}`}>
                      Eat-in
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Coma na casa da cozinheira
                    </p>
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* Botão de Pedido */}
          <button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white font-semibold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
            Fazer Pedido • R$ {dish.price.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
