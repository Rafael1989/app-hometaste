import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DishService } from '../../core/services/dish.service';
import { AuthService } from '../../core/services/auth.service';
import { Dish } from '../../core/models/dish.model';

@Component({
  selector: 'app-dish-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="navbar">
      <div class="nav-content">
        <a routerLink="/dashboard" class="nav-brand">HomeTaste</a>
        <div class="nav-links">
          <a routerLink="/dashboard">Dashboard</a>
          <a routerLink="/dishes">Pratos</a>
          <a routerLink="/orders">Pedidos</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="page-header">
        <h1>{{ isCook ? 'Meus Pratos' : 'Pratos Disponíveis' }}</h1>
        <a routerLink="/dishes/new" class="btn btn-primary" *ngIf="isCook">
          + Novo Prato
        </a>
      </div>

      <div class="loading" *ngIf="loading"></div>

      <div class="grid grid-3" *ngIf="!loading">
        <div class="card dish-card" *ngFor="let dish of dishes">
          <div class="dish-image" [style.background-image]="'url(' + (dish.imageUrl || 'https://via.placeholder.com/300x200') + ')'"></div>
          <div class="dish-content">
            <h3>{{ dish.name }}</h3>
            <p class="dish-description">{{ dish.description }}</p>
            <div class="dish-footer">
              <span class="dish-price">R$ {{ dish.price.toFixed(2) }}</span>
              <span class="dish-category">{{ dish.category }}</span>
            </div>
            <div class="dish-actions" *ngIf="isCook">
              <button class="btn btn-secondary btn-sm" (click)="toggleAvailability(dish)">
                {{ dish.available ? 'Desativar' : 'Ativar' }}
              </button>
              <button class="btn btn-danger btn-sm" (click)="deleteDish(dish.id)">
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="alert alert-info" *ngIf="!loading && dishes.length === 0">
        {{ isCook ? 'Você ainda não cadastrou nenhum prato.' : 'Nenhum prato disponível no momento.' }}
      </div>
    </div>
  `,
  styles: [`
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 32px;
      
      h1 {
        font-size: 36px;
        color: #1f2937;
      }
    }

    .dish-card {
      overflow: hidden;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
      }
    }

    .dish-image {
      width: 100%;
      height: 200px;
      background-size: cover;
      background-position: center;
      background-color: #f3f4f6;
    }

    .dish-content {
      padding: 16px;
      
      h3 {
        font-size: 20px;
        color: #1f2937;
        margin-bottom: 8px;
      }
    }

    .dish-description {
      color: #6b7280;
      font-size: 14px;
      margin-bottom: 16px;
      line-height: 1.5;
    }

    .dish-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .dish-price {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
    }

    .dish-category {
      background: #f3f4f6;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      color: #6b7280;
      font-weight: 600;
    }

    .dish-actions {
      display: flex;
      gap: 8px;
    }

    .btn-sm {
      padding: 8px 16px;
      font-size: 14px;
    }
  `]
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];
  loading = true;
  isCook = false;

  constructor(
    private dishService: DishService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isCook = user?.role === 'COZINHEIRA';
    this.loadDishes();
  }

  loadDishes(): void {
    const user = this.authService.getCurrentUser();
    
    if (this.isCook && user) {
      this.dishService.getDishesByCook(user.id).subscribe({
        next: (dishes) => {
          this.dishes = dishes;
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    } else {
      this.dishService.getAllDishes().subscribe({
        next: (dishes) => {
          this.dishes = dishes.filter(d => d.available);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
    }
  }

  toggleAvailability(dish: Dish): void {
    const updatedDish = { ...dish, available: !dish.available };
    this.dishService.updateDish(dish.id, updatedDish).subscribe({
      next: () => {
        this.loadDishes();
      }
    });
  }

  deleteDish(id: number): void {
    if (confirm('Tem certeza que deseja excluir este prato?')) {
      this.dishService.deleteDish(id).subscribe({
        next: () => {
          this.loadDishes();
        }
      });
    }
  }
}
