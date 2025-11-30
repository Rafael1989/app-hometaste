'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ChefHat, User, Truck } from 'lucide-react';
import { UserRole } from '@/lib/types';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular login e redirecionar baseado no role
    if (selectedRole === 'customer') {
      window.location.href = '/';
    } else if (selectedRole === 'chef') {
      window.location.href = '/chef/dashboard';
    } else if (selectedRole === 'delivery') {
      window.location.href = '/delivery/dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] rounded-2xl mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">HomeTaste</h1>
          <p className="text-gray-600 mt-2">
            {mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {/* Role Selection (apenas no registro) */}
        {mode === 'register' && (
          <div className="mb-6">
            <Label className="mb-3 block">Você é:</Label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setSelectedRole('customer')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'customer'
                    ? 'border-[#FF6B35] bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <User className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xs font-medium">Cliente</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('chef')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'chef'
                    ? 'border-[#FF6B35] bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <ChefHat className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xs font-medium">Cozinheira</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole('delivery')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedRole === 'delivery'
                    ? 'border-[#FF6B35] bg-orange-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Truck className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xs font-medium">Entregador</div>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'register' && (
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input id="name" type="text" placeholder="Seu nome" required />
            </div>
          )}

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" required />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>

          {mode === 'register' && (
            <>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" type="tel" placeholder="(11) 99999-9999" required />
              </div>
              <div>
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" type="text" placeholder="Rua, número, bairro" required />
              </div>
            </>
          )}

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C42] hover:from-[#FF5722] hover:to-[#FF7733] text-white"
          >
            {mode === 'login' ? 'Entrar' : 'Criar conta'}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-[#FF6B35] hover:underline"
          >
            {mode === 'login' 
              ? 'Não tem conta? Cadastre-se' 
              : 'Já tem conta? Entre'}
          </button>
        </div>

        {/* Social Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="outline" type="button">
              Google
            </Button>
            <Button variant="outline" type="button">
              Facebook
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
