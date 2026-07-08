import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  errorMessage = '';
  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  login(): void {
    this.errorMessage = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    try {
      const response = this.authService.login(this.form.value.email ?? '', this.form.value.password ?? '');
      this.router.navigateByUrl(response.redirectUrl);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Nao foi possivel entrar.';
    }
  }

  fillProfile(type: 'client' | 'seller' | 'admin'): void {
    const email = type === 'seller' ? 'vendedor@multifort.com' : type === 'admin' ? 'filips8@hotmail.com' : 'cliente@multifort.com';
    this.form.setValue({ email, password: '123456' });
  }
}
