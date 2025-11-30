'use client';

import { Dish } from '@/lib/types';
import { Star, Clock, MapPin, Home, Truck } from 'lucide-react';
import Image from 'next/image';

interface DishCardProps {
  dish: Dish;
  onClick: () => void;
}

export function DishCard({ dish, onClick }: DishCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
    >
      {/* Imagem do Prato */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={dish.photo}
          alt={dish.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-lg font-bold text-[#FF6B35]">R$ {dish.price.toFixed(2)}</span>
        </div>
        <div className="absolute top-3 left-3 bg-[#FF6B35] text-white px-3 py-1 rounded-full text-sm font-medium">
          {dish.category}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Nome do Prato */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-1">
          {dish.name}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {dish.description}
        </p>

        {/* Info da Cozinheira */}
        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
          <Image
            src={dish.chef.avatar}
            alt={dish.chef.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {dish.chef.name}
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {dish.chef.rating} ({dish.chef.totalReviews})
              </span>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 text-[#FF6B35]" />
            <span>{dish.preparationTime} min • {dish.availableTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 text-[#FF6B35]" />
            <span>{dish.chef.distance} km • {dish.chef.location}</span>
          </div>
          <div className="flex items-center gap-3 pt-2">
            {dish.deliveryAvailable && (
              <div className="flex items-center gap-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full">
                <Truck className="w-3 h-3" />
                <span>Delivery</span>
              </div>
            )}
            {dish.eatInAvailable && (
              <div className="flex items-center gap-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-2 py-1 rounded-full">
                <Home className="w-3 h-3" />
                <span>Eat-in</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
