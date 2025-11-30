import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DishService } from '../../core/services/dish.service';

@Component({
  selector: 'app-dish-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
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
      <div class="form-container">
        <div class="card">
          <h1>Cadastrar Novo Prato</h1>
          
          <form [formGroup]="dishForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nome do Prato</label>
              <input 
                id="name" 
                type="text" 
                formControlName="name" 
                placeholder="Ex: Feijoada Completa"
              />
            </div>

            <div class="form-group">
              <label for="description">Descrição</label>
              <textarea 
                id="description" 
                formControlName="description" 
                placeholder="Descreva seu prato..."
              ></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="price">Preço (R$)</label>
                <input 
                  id="price" 
                  type="number" 
                  step="0.01"
                  formControlName="price" 
                  placeholder="0.00"
                />
              </div>

              <div class="form-group">
                <label for="category">Categoria</label>
                <select id="category" formControlName="category">
                  <option value="">Selecione...</option>
                  <option value="Brasileira">Brasileira</option>
                  <option value="Italiana">Italiana</option>
                  <option value="Japonesa">Japonesa</option>
                  <option value="Lanches">Lanches</option>
                  <option value="Sobremesas">Sobremesas</option>
                  <option value="Bebidas">Bebidas</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="imageUrl">URL da Imagem</label>
              <input 
                id="imageUrl" 
                type="url" 
                formControlName="imageUrl" 
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="available" />
                <span>Disponível para venda</span>
              </label>
            </div>

            <div class="alert alert-success" *ngIf="successMessage">
              {{ successMessage }}
            </div>

            <div class="alert alert-error" *ngIf="errorMessage">
              {{ errorMessage }}
            </div>

            <div class="form-actions">
              <button type="submit" class="btn btn-primary" [disabled]="dishForm.invalid || loading">
                {{ loading ? 'Salvando...' : 'Cadastrar Prato' }}
              </button>
              <a routerLink="/dishes" class="btn btn-secondary">Cancelar</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      font-size: 32px;
      color: #1f2937;
      margin-bottom: 32px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      
      input[type="checkbox"] {
        width: auto;
        cursor: pointer;
      }
      
      span {
        font-weight: 600;
        color: #374151;
      }
    }

    .form-actions {
      display: flex;
      gap: 16px;
      margin-top: 24px;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DishFormComponent {
  dishForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private dishService: DishService,
    private router: Router
  ) {
    this.dishForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      imageUrl: [''],
      available: [true]
    });
  }

  onSubmit(): void {
    if (this.dishForm.valid) {
      this.loading = true;
      this.errorMessage = '';
      this.successMessage = '';

      this.dishService.createDish(this.dishForm.value).subscribe({
        next: () => {
          this.successMessage = 'Prato cadastrado com sucesso!';
          this.loading = false;
          setTimeout(() => {
            this.router.navigate(['/dishes']);
          }, 1500);
        },
        error: () => {
          this.errorMessage = 'Erro ao cadastrar prato. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }
}
