'use client';

import { useState, useMemo } from 'react';
import { mockDishes } from '@/lib/mock-data';
import { Dish } from '@/lib/types';
import { DishCard } from '@/components/custom/dish-card';
import { DishModal } from '@/components/custom/dish-modal';
import { Filters } from '@/components/custom/filters';
import { ChefHat, MapPin, Sparkles, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar pratos
  const filteredDishes = useMemo(() => {
    return mockDishes.filter((dish) => {
      const matchesCategory = selectedCategory === 'Todas' || dish.category === selectedCategory;
      const matchesSearch = 
        dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dish.chef.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleDishClick = (dish: Dish) => {
    setSelectedDish(dish);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedDish(null), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="flex items-center justify-between mb-8">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <ChefHat className="w-8 h-8" />
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold">HomeTaste</h1>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <User className="w-4 h-4 mr-2" />
                  Entrar
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            {/* Tagline */}
            <p className="text-xl sm:text-2xl mb-4 text-white/90 font-medium">
              Comida caseira feita com amor 🍲
            </p>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Descubra pratos deliciosos feitos por cozinheiras da sua região. 
              Delivery ou coma na casa da cozinheira!
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <ChefHat className="w-5 h-5" />
                <span className="font-semibold">200+ Cozinheiras</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">500+ Pratos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin className="w-5 h-5" />
                <span className="font-semibold">50+ Bairros</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12 sm:h-16">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" className="text-orange-50 dark:text-gray-900"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Filtros */}
        <div className="mb-8">
          <Filters
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Título da Seção */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            {selectedCategory === 'Todas' ? 'Pratos Disponíveis' : `Pratos ${selectedCategory}s`}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredDishes.length} {filteredDishes.length === 1 ? 'prato encontrado' : 'pratos encontrados'} na sua região
          </p>
        </div>

        {/* Grid de Pratos */}
        {filteredDishes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <DishCard
                key={dish.id}
                dish={dish}
                onClick={() => handleDishClick(dish)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Nenhum prato encontrado
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ChefHat className="w-6 h-6 text-[#FF6B35]" />
                <span className="text-xl font-bold">HomeTaste</span>
              </div>
              <p className="text-gray-400 text-sm">
                Conectando você com as melhores cozinheiras da sua região.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Clientes</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/" className="hover:text-white">Como funciona</Link></li>
                <li><Link href="/" className="hover:text-white">Pratos disponíveis</Link></li>
                <li><Link href="/" className="hover:text-white">Avaliações</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Cozinheiras</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/auth" className="hover:text-white">Cadastre-se</Link></li>
                <li><Link href="/chef/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/auth" className="hover:text-white">Ganhe dinheiro</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Entregadores</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/auth" className="hover:text-white">Cadastre-se</Link></li>
                <li><Link href="/delivery/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/auth" className="hover:text-white">Seja parceiro</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 HomeTaste. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Detalhes */}
      <DishModal
        dish={selectedDish}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
