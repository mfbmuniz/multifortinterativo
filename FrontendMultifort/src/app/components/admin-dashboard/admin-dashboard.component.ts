import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Simulation } from '../../entities/simulation.entity';
import { AuthService } from '../../services/auth.service';
import { SellerAssignmentService } from '../../services/seller-assignment.service';
import { SetupService } from '../../services/setup.service';
import { SimulationService } from '../../services/simulation.service';
import { UserService } from '../../services/user.service';
import { StatusBadgeComponent } from '../shared/status-badge/status-badge.component';
import { AssignSellerDialogComponent } from './assign-seller-dialog/assign-seller-dialog.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [DatePipe, RouterLink, RouterLinkActive, StatusBadgeComponent, AssignSellerDialogComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly simulationService = inject(SimulationService);
  private readonly setupService = inject(SetupService);
  private readonly userService = inject(UserService);
  private readonly sellerAssignmentService = inject(SellerAssignmentService);
  currentUser = this.authService.getCurrentUser();
  simulations = this.simulationService.getSimulations();
  users = this.userService.getUsers();
  sellers = this.userService.getSellers();
  setups = this.setupService.getSetups();
  selectedSimulation?: Simulation;

  getUserName(userId: string): string {
    return this.userService.findById(userId)?.name ?? 'Usuario nao encontrado';
  }

  getSellerName(sellerId?: string): string {
    return sellerId ? this.userService.findById(sellerId)?.name ?? '-' : 'Nao atribuido';
  }

  getSetupName(setupId: string): string {
    return this.setupService.getSetupById(setupId)?.name ?? 'Setup removido';
  }

  assignSeller(sellerId: string): void {
    if (!this.selectedSimulation) {
      return;
    }

    this.sellerAssignmentService.assign(this.selectedSimulation.id, sellerId);
    this.simulations = this.simulationService.getSimulations();
    this.selectedSimulation = undefined;
  }

  logout(): void {
    this.authService.logout();
  }
}
