'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { ChefHat, Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewDishPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Brasileira',
    availableDate: '',
    availableTime: '',
    preparationTime: '',
    eatInAvailable: false,
    deliveryAvailable: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Novo prato:', formData);
    // Aqui você implementaria a lógica de salvar o prato
    alert('Prato cadastrado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link href="/chef/dashboard">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] p-2 rounded-xl">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Prato</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Foto do Prato */}
            <div>
              <Label>Foto do Prato</Label>
              <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-[#FF6B35] transition-colors cursor-pointer">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#FF6B35] hover:text-[#FF5722]">
                      <span>Carregar uma foto</span>
                      <input type="file" className="sr-only" accept="image/*" />
                    </label>
                    <p className="pl-1">ou arraste e solte</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
                </div>
              </div>
            </div>

            {/* Nome do Prato */}
            <div>
              <Label htmlFor="name">Nome do Prato *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Ex: Feijoada Completa"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                placeholder="Descreva os ingredientes e o que acompanha o prato..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            {/* Preço e Categoria */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Preço (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  placeholder="45.00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Categoria *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
                  required
                >
                  <option value="Brasileira">Brasileira</option>
                  <option value="Italiana">Italiana</option>
                  <option value="Asiática">Asiática</option>
                  <option value="Vegetariana">Vegetariana</option>
                  <option value="Sobremesas">Sobremesas</option>
                  <option value="Mexicana">Mexicana</option>
                  <option value="Árabe">Árabe</option>
                </select>
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="availableDate">Data Disponível *</Label>
                <Input
                  id="availableDate"
                  type="date"
                  value={formData.availableDate}
                  onChange={(e) => setFormData({ ...formData, availableDate: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="availableTime">Horário *</Label>
                <Input
                  id="availableTime"
                  type="text"
                  placeholder="Ex: 12:00 - 14:00"
                  value={formData.availableTime}
                  onChange={(e) => setFormData({ ...formData, availableTime: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Tempo de Preparo */}
            <div>
              <Label htmlFor="preparationTime">Tempo de Preparo (minutos) *</Label>
              <Input
                id="preparationTime"
                type="number"
                placeholder="30"
                value={formData.preparationTime}
                onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                required
              />
            </div>

            {/* Opções de Entrega */}
            <div className="space-y-4">
              <Label>Opções de Entrega</Label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.deliveryAvailable}
                    onChange={(e) => setFormData({ ...formData, deliveryAvailable: e.target.checked })}
                    className="w-4 h-4 text-[#FF6B35] border-gray-300 rounded focus:ring-[#FF6B35]"
                  />
                  <span className="text-sm text-gray-700">Aceito delivery</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.eatInAvailable}
                    onChange={(e) => setFormData({ ...formData, eatInAvailable: e.target.checked })}
                    className="w-4 h-4 text-[#FF6B35] border-gray-300 rounded focus:ring-[#FF6B35]"
                  />
                  <span className="text-sm text-gray-700">Aceito clientes em casa (Eat-in)</span>
                </label>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-6">
              <Link href="/chef/dashboard" className="flex-1">
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </Link>
              <Button 
                type="submit" 
                className="flex-1 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF5722] hover:to-[#FF7733]"
              >
                Cadastrar Prato
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  );
}
