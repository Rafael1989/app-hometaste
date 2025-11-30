import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <h1>HomeTaste</h1>
        <h2>Bem-vindo de volta!</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              id="email" 
              type="email" 
              formControlName="email" 
              placeholder="seu@email.com"
            />
            <div class="error" *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
              Email é obrigatório
            </div>
          </div>

          <div class="form-group">
            <label for="password">Senha</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password" 
              placeholder="••••••••"
            />
            <div class="error" *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
              Senha é obrigatória
            </div>
          </div>

          <div class="alert alert-error" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || loading">
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="auth-link">
          Não tem uma conta? <a routerLink="/register">Cadastre-se</a>
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
      max-width: 450px;
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

    .error {
      color: #ef4444;
      font-size: 14px;
      margin-top: 4px;
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
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Email ou senha inválidos';
          this.loading = false;
        }
      });
    }
  }
}
