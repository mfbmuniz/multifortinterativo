import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SolarSetup } from '../../../entities/solar-setup.entity';
import { PendingSimulation } from '../../../entities/simulation.entity';
import { AuthService } from '../../../services/auth.service';
import { SetupService } from '../../../services/setup.service';
import { SimulationService } from '../../../services/simulation.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SetupCardComponent } from '../../shared/setup-card/setup-card.component';
import { SetupDetailsDialogComponent } from '../setup-details-dialog/setup-details-dialog.component';

@Component({
  selector: 'app-simulation-result',
  imports: [CurrencyPipe, HeaderComponent, FooterComponent, SetupCardComponent, SetupDetailsDialogComponent],
  templateUrl: './simulation-result.component.html',
  styleUrl: './simulation-result.component.scss'
})
export class SimulationResultComponent {
  private readonly setupService = inject(SetupService);
  private readonly simulationService = inject(SimulationService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  setups = this.setupService.getSetups();
  pending: PendingSimulation = this.simulationService.getPendingSimulation() ?? {
    selectedSetupId: 'setup-ideal',
    invoiceFile: this.simulationService.getLastInvoice() ?? undefined,
    consumptionKwh: 450,
    currentBillValue: 420,
    solarBillValue: 50
  };
  selectedSetup = this.setupService.getSetupById(this.pending.selectedSetupId) ?? this.setups[0];
  detailsSetup?: SolarSetup;
  successMessage = '';

  openDetails(setup: SolarSetup): void {
    this.detailsSetup = setup;
  }

  chooseSetup(setup: SolarSetup): void {
    this.selectedSetup = setup;
    this.detailsSetup = undefined;
  }

  sendToCommercial(): void {
    const pendingSimulation = { ...this.pending, selectedSetupId: this.selectedSetup.id };
    const user = this.authService.getCurrentUser();

    if (!user) {
      this.simulationService.savePendingSimulation(pendingSimulation);
      this.router.navigateByUrl('/login');
      return;
    }

    this.simulationService.createSimulation(user.id, pendingSimulation);
    this.successMessage = 'Simulacao enviada para analise administrativa.';
    this.router.navigateByUrl('/painel/usuario');
  }
}
