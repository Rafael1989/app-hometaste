import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order } from '../../core/models/order.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="navbar">
      <div class="nav-content">
        <a routerLink="/dashboard" class="nav-brand">HomeTaste</a>
        <div class="nav-links">
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/dishes" *ngIf="userRole !== 'ENTREGADOR'">Pratos</a>
          <a routerLink="/orders">Pedidos</a>
        </div>
      </div>
    </div>

    <div class="container">
      <h1>{{ getPageTitle() }}</h1>

      <div class="loading" *ngIf="loading"></div>

      <div class="orders-list" *ngIf="!loading">
        <div class="card order-card" *ngFor="let order of orders">
          <div class="order-header">
            <div>
              <h3>Pedido #{{ order.id }}</h3>
              <p class="order-date">{{ formatDate(order.createdAt) }}</p>
            </div>
            <span class="status-badge" [class]="'status-' + order.status.toLowerCase()">
              {{ getStatusLabel(order.status) }}
            </span>
          </div>

          <div class="order-body">
            <div class="order-info">
              <p><strong>Prato:</strong> {{ order.dishName }}</p>
              <p><strong>Quantidade:</strong> {{ order.quantity }}</p>
              <p><strong>Cliente:</strong> {{ order.customerName }}</p>
              <p><strong>Endereço:</strong> {{ order.deliveryAddress }}</p>
              <p *ngIf="order.deliveryPersonName"><strong>Entregador:</strong> {{ order.deliveryPersonName }}</p>
            </div>
            <div class="order-price">
              <span class="price-label">Total</span>
              <span class="price-value">R$ {{ order.totalPrice.toFixed(2) }}</span>
            </div>
          </div>

          <div class="order-actions" *ngIf="canManageOrder(order)">
            <button 
              class="btn btn-primary btn-sm" 
              *ngIf="userRole === 'COZINHEIRA' && order.status === 'PENDENTE'"
              (click)="updateStatus(order.id, 'CONFIRMADO')"
            >
              Confirmar
            </button>
            <button 
              class="btn btn-primary btn-sm" 
              *ngIf="userRole === 'COZINHEIRA' && order.status === 'CONFIRMADO'"
              (click)="updateStatus(order.id, 'EM_PREPARO')"
            >
              Iniciar Preparo
            </button>
            <button 
              class="btn btn-primary btn-sm" 
              *ngIf="userRole === 'COZINHEIRA' && order.status === 'EM_PREPARO'"
              (click)="updateStatus(order.id, 'PRONTO')"
            >
              Marcar como Pronto
            </button>
            <button 
              class="btn btn-primary btn-sm" 
              *ngIf="userRole === 'ENTREGADOR' && order.status === 'PRONTO' && !order.deliveryPersonId"
              (click)="assignDelivery(order.id)"
            >
              Aceitar Entrega
            </button>
            <button 
              class="btn btn-primary btn-sm" 
              *ngIf="userRole === 'ENTREGADOR' && order.deliveryPersonId && order.status === 'PRONTO'"
              (click)="updateStatus(order.id, 'ENTREGUE')"
            >
              Marcar como Entregue
            </button>
          </div>
        </div>
      </div>

      <div class="alert alert-info" *ngIf="!loading && orders.length === 0">
        Nenhum pedido encontrado.
      </div>
    </div>
  `,
  styles: [`
    h1 {
      font-size: 36px;
      color: #1f2937;
      margin-bottom: 32px;
    }

    .orders-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .order-card {
      border-left: 4px solid #667eea;
    }

    .order-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5e7eb;
      
      h3 {
        font-size: 20px;
        color: #1f2937;
        margin-bottom: 4px;
      }
    }

    .order-date {
      color: #6b7280;
      font-size: 14px;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      
      &.status-pendente {
        background: #fef3c7;
        color: #92400e;
      }
      
      &.status-confirmado {
        background: #dbeafe;
        color: #1e40af;
      }
      
      &.status-em_preparo {
        background: #fce7f3;
        color: #9f1239;
      }
      
      &.status-pronto {
        background: #d1fae5;
        color: #065f46;
      }
      
      &.status-entregue {
        background: #d1d5db;
        color: #1f2937;
      }
    }

    .order-body {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 24px;
      margin-bottom: 16px;
    }

    .order-info {
      p {
        margin-bottom: 8px;
        color: #374151;
        
        strong {
          color: #1f2937;
        }
      }
    }

    .order-price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      
      .price-label {
        font-size: 14px;
        color: #6b7280;
        margin-bottom: 4px;
      }
      
      .price-value {
        font-size: 28px;
        font-weight: 700;
        color: #667eea;
      }
    }

    .order-actions {
      display: flex;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid #e5e7eb;
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .order-body {
        grid-template-columns: 1fr;
      }
      
      .order-price {
        align-items: flex-start;
      }
    }
  `]
})
export class OrderListComponent implements OnInit {
  orders: Order[] = [];
  loading = true;
  userRole: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.userRole = user?.role || '';
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  getPageTitle(): string {
    const titles: Record<string, string> = {
      'CLIENTE': 'Meus Pedidos',
      'COZINHEIRA': 'Pedidos Recebidos',
      'ENTREGADOR': 'Entregas Disponíveis'
    };
    return titles[this.userRole] || 'Pedidos';
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'PENDENTE': 'Pendente',
      'CONFIRMADO': 'Confirmado',
      'EM_PREPARO': 'Em Preparo',
      'PRONTO': 'Pronto',
      'ENTREGUE': 'Entregue',
      'CANCELADO': 'Cancelado'
    };
    return labels[status] || status;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  canManageOrder(order: Order): boolean {
    if (this.userRole === 'COZINHEIRA') {
      return ['PENDENTE', 'CONFIRMADO', 'EM_PREPARO'].includes(order.status);
    }
    if (this.userRole === 'ENTREGADOR') {
      return order.status === 'PRONTO';
    }
    return false;
  }

  updateStatus(orderId: number, status: string): void {
    this.orderService.updateOrderStatus(orderId, status).subscribe({
      next: () => {
        this.loadOrders();
      }
    });
  }

  assignDelivery(orderId: number): void {
    this.orderService.assignDelivery(orderId).subscribe({
      next: () => {
        this.loadOrders();
      }
    });
  }
}
