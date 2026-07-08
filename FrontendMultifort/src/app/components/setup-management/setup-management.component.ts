import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SolarSetup } from '../../entities/solar-setup.entity';
import { AuthService } from '../../services/auth.service';
import { SetupService } from '../../services/setup.service';
import { SetupFormDialogComponent } from './setup-form-dialog/setup-form-dialog.component';

@Component({
  selector: 'app-setup-management',
  imports: [CurrencyPipe, RouterLink, RouterLinkActive, SetupFormDialogComponent],
  templateUrl: './setup-management.component.html',
  styleUrl: './setup-management.component.scss'
})
export class SetupManagementComponent {
  private readonly setupService = inject(SetupService);
  private readonly authService = inject(AuthService);
  setups = this.setupService.getSetups();
  editingSetup?: SolarSetup;
  isDialogOpen = false;

  openNew(): void {
    this.editingSetup = undefined;
    this.isDialogOpen = true;
  }

  openEdit(setup: SolarSetup): void {
    this.editingSetup = setup;
    this.isDialogOpen = true;
  }

  save(setup: SolarSetup): void {
    this.setupService.saveSetup(setup);
    this.setups = this.setupService.getSetups();
    this.isDialogOpen = false;
  }

  delete(id: string): void {
    this.setupService.deleteSetup(id);
    this.setups = this.setupService.getSetups();
  }

  logout(): void {
    this.authService.logout();
  }
}
