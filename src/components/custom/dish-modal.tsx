'use client';

import { Dish } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Clock, ChefHat, ShoppingCart, Home } from 'lucide-react';

interface DishModalProps {
  dish: Dish | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DishModal({ dish, isOpen, onClose }: DishModalProps) {
  if (!dish) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{dish.name}</DialogTitle>
        </DialogHeader>

        {/* Imagem */}
        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-3 left-3 bg-[#FF6B35] text-white border-none">
            {dish.category}
          </Badge>
        </div>

        {/* Informações da Cozinheira */}
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg">
            {dish.chef.name.charAt(0)}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{dish.chef.name}</p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {dish.chef.rating.toFixed(1)} ({dish.chef.reviewCount} avaliações)
              </span>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Descrição</h3>
          <p className="text-gray-600 dark:text-gray-400">{dish.description}</p>
        </div>

        {/* Detalhes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-5 h-5 text-[#FF6B35]" />
            <span>{dish.chef.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-5 h-5 text-[#FF6B35]" />
            <span>Preparo: {dish.preparationTime}</span>
          </div>
          {dish.servings && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <ChefHat className="w-5 h-5 text-[#FF6B35]" />
              <span>Serve {dish.servings} {dish.servings === 1 ? 'pessoa' : 'pessoas'}</span>
            </div>
          )}
        </div>

        {/* Preço e Ações */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-3xl font-bold text-[#FF6B35]">
              R$ {dish.price.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {dish.availableForDelivery && (
              <Button className="bg-[#FF6B35] hover:bg-[#FF8C42] text-white">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Pedir Delivery
              </Button>
            )}
            {dish.availableForDineIn && (
              <Button variant="outline" className="border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white">
                <Home className="w-4 h-4 mr-2" />
                Comer no Local
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
