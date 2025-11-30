import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { DishService } from '../../core/services/dish.service';
import { OrderService } from '../../core/services/order.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="navbar">
      <div class="nav-content">
        <a routerLink="/dashboard" class="nav-brand">HomeTaste</a>
        <div class="nav-links">
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/dishes" *ngIf="user?.role === 'COZINHEIRA' || user?.role === 'CLIENTE'">Pratos</a>
          <a routerLink="/orders">Pedidos</a>
          <button class="btn btn-secondary" (click)="logout()">Sair</button>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="dashboard-header">
        <h1>Bem-vindo, {{ user?.name }}!</h1>
        <p class="role-badge">{{ getRoleLabel(user?.role) }}</p>
      </div>

      <!-- Dashboard Cliente -->
      <div *ngIf="user?.role === 'CLIENTE'" class="dashboard-content">
        <div class="grid grid-3">
          <div class="card stat-card">
            <h3>Pedidos Ativos</h3>
            <p class="stat-number">{{ stats.activeOrders }}</p>
          </div>
          <div class="card stat-card">
            <h3>Total de Pedidos</h3>
            <p class="stat-number">{{ stats.totalOrders }}</p>
          </div>
          <div class="card stat-card">
            <h3>Pratos Disponíveis</h3>
            <p class="stat-number">{{ stats.availableDishes }}</p>
          </div>
        </div>

        <div class="card">
          <h2>Ações Rápidas</h2>
          <div class="action-buttons">
            <a routerLink="/dishes" class="btn btn-primary">Ver Pratos</a>
            <a routerLink="/orders" class="btn btn-secondary">Meus Pedidos</a>
          </div>
        </div>
      </div>

      <!-- Dashboard Cozinheira -->
      <div *ngIf="user?.role === 'COZINHEIRA'" class="dashboard-content">
        <div class="grid grid-3">
          <div class="card stat-card">
            <h3>Meus Pratos</h3>
            <p class="stat-number">{{ stats.myDishes }}</p>
          </div>
          <div class="card stat-card">
            <h3>Pedidos Pendentes</h3>
            <p class="stat-number">{{ stats.pendingOrders }}</p>
          </div>
          <div class="card stat-card">
            <h3>Receita do Mês</h3>
            <p class="stat-number">R$ {{ stats.monthlyRevenue }}</p>
          </div>
        </div>

        <div class="card">
          <h2>Ações Rápidas</h2>
          <div class="action-buttons">
            <a routerLink="/dishes/new" class="btn btn-primary">Cadastrar Prato</a>
            <a routerLink="/dishes" class="btn btn-secondary">Meus Pratos</a>
            <a routerLink="/orders" class="btn btn-secondary">Ver Pedidos</a>
          </div>
        </div>
      </div>

      <!-- Dashboard Entregador -->
      <div *ngIf="user?.role === 'ENTREGADOR'" class="dashboard-content">
        <div class="grid grid-3">
          <div class="card stat-card">
            <h3>Entregas Disponíveis</h3>
            <p class="stat-number">{{ stats.availableDeliveries }}</p>
          </div>
          <div class="card stat-card">
            <h3>Minhas Entregas</h3>
            <p class="stat-number">{{ stats.myDeliveries }}</p>
          </div>
          <div class="card stat-card">
            <h3>Ganhos do Mês</h3>
            <p class="stat-number">R$ {{ stats.monthlyEarnings }}</p>
          </div>
        </div>

        <div class="card">
          <h2>Ações Rápidas</h2>
          <div class="action-buttons">
            <a routerLink="/orders" class="btn btn-primary">Ver Entregas</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-header {
      margin-bottom: 32px;
      
      h1 {
        font-size: 36px;
        color: #1f2937;
        margin-bottom: 8px;
      }
    }

    .role-badge {
      display: inline-block;
      padding: 8px 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 20px;
      font-weight: 600;
      font-size: 14px;
    }

    .dashboard-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    .stat-card {
      text-align: center;
      
      h3 {
        font-size: 16px;
        color: #6b7280;
        margin-bottom: 12px;
      }
      
      .stat-number {
        font-size: 48px;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .action-buttons {
      display: flex;
      gap: 16px;
      margin-top: 16px;
      flex-wrap: wrap;
    }

    h2 {
      font-size: 24px;
      color: #1f2937;
      margin-bottom: 16px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  user: User | null = null;
  stats = {
    activeOrders: 0,
    totalOrders: 0,
    availableDishes: 0,
    myDishes: 0,
    pendingOrders: 0,
    monthlyRevenue: 0,
    availableDeliveries: 0,
    myDeliveries: 0,
    monthlyEarnings: 0
  };

  constructor(
    private authService: AuthService,
    private dishService: DishService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.loadStats();
  }

  loadStats(): void {
    if (this.user?.role === 'CLIENTE') {
      this.dishService.getAllDishes().subscribe(dishes => {
        this.stats.availableDishes = dishes.filter(d => d.available).length;
      });
      
      this.orderService.getMyOrders().subscribe(orders => {
        this.stats.totalOrders = orders.length;
        this.stats.activeOrders = orders.filter(o => 
          o.status !== 'ENTREGUE' && o.status !== 'CANCELADO'
        ).length;
      });
    } else if (this.user?.role === 'COZINHEIRA') {
      this.dishService.getDishesByCook(this.user.id).subscribe(dishes => {
        this.stats.myDishes = dishes.length;
      });
      
      this.orderService.getOrdersByStatus('PENDENTE').subscribe(orders => {
        this.stats.pendingOrders = orders.length;
      });
    } else if (this.user?.role === 'ENTREGADOR') {
      this.orderService.getOrdersByStatus('PRONTO').subscribe(orders => {
        this.stats.availableDeliveries = orders.filter(o => !o.deliveryPersonId).length;
      });
    }
  }

  getRoleLabel(role?: string): string {
    const labels: Record<string, string> = {
      'CLIENTE': 'Cliente',
      'COZINHEIRA': 'Cozinheira',
      'ENTREGADOR': 'Entregador'
    };
    return labels[role || ''] || '';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
