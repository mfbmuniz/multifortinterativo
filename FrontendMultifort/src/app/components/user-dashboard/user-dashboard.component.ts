import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SetupService } from '../../services/setup.service';
import { SimulationService } from '../../services/simulation.service';
import { UserService } from '../../services/user.service';
import { StatusBadgeComponent } from '../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [DatePipe, RouterLink, StatusBadgeComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly simulationService = inject(SimulationService);
  private readonly setupService = inject(SetupService);
  private readonly userService = inject(UserService);
  user = this.authService.getCurrentUser();
  simulations = this.user ? this.simulationService.getByUser(this.user.id) : [];

  getSetupName(setupId: string): string {
    return this.setupService.getSetupById(setupId)?.name ?? 'Setup removido';
  }

  getSellerName(sellerId?: string): string {
    return sellerId ? this.userService.findById(sellerId)?.name ?? 'Nao encontrado' : 'Nao definido';
  }

  logout(): void {
    this.authService.logout();
  }
}
