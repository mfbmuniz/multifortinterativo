import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimulationStatus } from '../../entities/simulation-status.entity';
import { AuthService } from '../../services/auth.service';
import { SetupService } from '../../services/setup.service';
import { SimulationService } from '../../services/simulation.service';
import { UserService } from '../../services/user.service';
import { StatusBadgeComponent } from '../shared/status-badge/status-badge.component';

@Component({
  selector: 'app-seller-dashboard',
  imports: [CurrencyPipe, RouterLink, StatusBadgeComponent],
  templateUrl: './seller-dashboard.component.html',
  styleUrl: './seller-dashboard.component.scss'
})
export class SellerDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly simulationService = inject(SimulationService);
  private readonly setupService = inject(SetupService);
  private readonly userService = inject(UserService);
  user = this.authService.getCurrentUser();
  simulations = this.user ? this.simulationService.getBySeller(this.user.id) : [];

  getClientName(userId: string): string {
    return this.userService.findById(userId)?.name ?? 'Cliente';
  }

  getSetupName(setupId: string): string {
    return this.setupService.getSetupById(setupId)?.name ?? 'Setup removido';
  }

  getSetupPrice(setupId: string): number {
    return this.setupService.getSetupById(setupId)?.estimatedPrice ?? 0;
  }

  markInProgress(id: string): void {
    this.simulationService.updateStatus(id, SimulationStatus.IN_PROGRESS);
    this.simulations = this.user ? this.simulationService.getBySeller(this.user.id) : [];
  }

  markCompleted(id: string): void {
    this.simulationService.updateStatus(id, SimulationStatus.COMPLETED);
    this.simulations = this.user ? this.simulationService.getBySeller(this.user.id) : [];
  }

  logout(): void {
    this.authService.logout();
  }
}
