'use client';

import { Dish } from '@/lib/types';
import { Star, MapPin, Clock, ChefHat } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DishCardProps {
  dish: Dish;
  onClick: () => void;
}

export function DishCard({ dish, onClick }: DishCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-105 group"
      onClick={onClick}
    >
      {/* Imagem */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Badge de Categoria */}
        <Badge className="absolute top-3 left-3 bg-[#FF6B35] text-white border-none">
          {dish.category}
        </Badge>
        {/* Badge de Disponibilidade */}
        {dish.availableForDelivery && (
          <Badge className="absolute top-3 right-3 bg-green-500 text-white border-none">
            Delivery
          </Badge>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Nome e Preço */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 line-clamp-1">
            {dish.name}
          </h3>
          <span className="text-lg font-bold text-[#FF6B35] whitespace-nowrap ml-2">
            R$ {dish.price.toFixed(2)}
          </span>
        </div>

        {/* Descrição */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {dish.description}
        </p>

        {/* Informações da Cozinheira */}
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-semibold text-sm">
            {dish.chef.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {dish.chef.name}
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {dish.chef.rating.toFixed(1)} ({dish.chef.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-[#FF6B35]" />
            <span className="truncate">{dish.chef.location}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 text-[#FF6B35]" />
            <span>Preparo: {dish.preparationTime}</span>
          </div>
          {dish.servings && (
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <ChefHat className="w-4 h-4 text-[#FF6B35]" />
              <span>Serve {dish.servings} {dish.servings === 1 ? 'pessoa' : 'pessoas'}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
