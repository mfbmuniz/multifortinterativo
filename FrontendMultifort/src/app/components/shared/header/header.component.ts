import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  currentUser = this.authService.getCurrentUser();

  get dashboardUrl(): string {
    return this.currentUser ? this.authService.getHomeByRole(this.currentUser) : '/login';
  }

  logout(): void {
    this.authService.logout();
  }
}
