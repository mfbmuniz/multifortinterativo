import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, RouterLink, HeaderComponent, FooterComponent],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  errorMessage = '';
  form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    gender: [''],
    phone: [''],
    city: ['']
  });

  register(): void {
    this.errorMessage = '';
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.form.markAllAsTouched();
      this.errorMessage = this.form.value.password !== this.form.value.confirmPassword ? 'As senhas precisam ser iguais.' : '';
      return;
    }

    try {
      this.userService.createUser({
        name: this.form.value.name ?? '',
        email: this.form.value.email ?? '',
        password: this.form.value.password ?? '',
        gender: this.form.value.gender ?? undefined,
        phone: this.form.value.phone ?? undefined,
        city: this.form.value.city ?? undefined
      });
      this.router.navigateByUrl('/login');
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Nao foi possivel cadastrar.';
    }
  }
}
