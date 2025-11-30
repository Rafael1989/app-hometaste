import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1>HomeTaste</h1>
        <h2>Crie sua conta</h2>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Nome Completo</label>
            <input 
              id="name" 
              type="text" 
              formControlName="name" 
              placeholder="Seu nome"
            />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              formControlName="email" 
              placeholder="seu@email.com"
            />
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password" 
              placeholder="••••••••"
            />
          </div>

          <div class="form-group">
            <label for="phone">Telefone</label>
            <input 
              id="phone" 
              type="tel" 
              formControlName="phone" 
              placeholder="(00) 00000-0000"
            />
          </div>

          <div class="form-group">
            <label for="address">Endereço</label>
            <input 
              id="address" 
              type="text" 
              formControlName="address" 
              placeholder="Seu endereço completo"
            />
          </div>

          <div class="form-group">
            <label for="role">Tipo de Conta</label>
            <select id="role" formControlName="role">
              <option value="CLIENTE">Cliente</option>
              <option value="COZINHEIRA">Cozinheira</option>
              <option value="ENTREGADOR">Entregador</option>
            </select>
          </div>

          <div class="alert alert-error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="registerForm.invalid || loading">
            {{ loading ? 'Cadastrando...' : 'Cadastrar' }}
          </button>
        </form>

        <p class="auth-link">
          Já tem uma conta? <a routerLink="/login">Faça login</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .auth-card {
      background: white;
      border-radius: 16px;
      padding: 48px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 32px;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 8px;
      text-align: center;
    }

    h2 {
      font-size: 24px;
      color: #374151;
      margin-bottom: 32px;
      text-align: center;
    }

    .auth-link {
      text-align: center;
      margin-top: 24px;
      color: #6b7280;
      
      a {
        color: #667eea;
        text-decoration: none;
        font-weight: 600;
        
        &:hover {
          text-decoration: underline;
        }
      }
    }

    button[disabled] {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: [''],
      address: [''],
      role: ['CLIENTE', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Erro ao cadastrar. Tente novamente.';
          this.loading = false;
        }
      });
    }
  }
}
