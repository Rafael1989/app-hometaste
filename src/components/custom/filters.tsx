'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface FiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = ['Todas', 'Brasileira', 'Italiana', 'Japonesa', 'Árabe', 'Vegana', 'Sobremesa'];

export function Filters({ selectedCategory, onCategoryChange, searchQuery, onSearchChange }: FiltersProps) {
  return (
    <div className="space-y-4">
      {/* Barra de Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar por prato, cozinheira ou ingrediente..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {/* Categorias */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => onCategoryChange(category)}
            className={
              selectedCategory === category
                ? 'bg-[#FF6B35] hover:bg-[#FF8C42] text-white'
                : 'border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800'
            }
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
