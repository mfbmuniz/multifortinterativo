import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { SimulationService } from '../../../services/simulation.service';

@Component({
  selector: 'app-upload-invoice',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './upload-invoice.component.html',
  styleUrl: './upload-invoice.component.scss'
})
export class UploadInvoiceComponent {
  selectedFileName = '';
  errorMessage = '';
  isUploading = false;

  constructor(
    private readonly simulationService: SimulationService,
    private readonly router: Router
  ) {}

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    this.errorMessage = '';
    this.selectedFileName = '';

    if (!file) {
      return;
    }

    if (!this.isPdfFile(file)) {
      this.errorMessage = 'Envie um arquivo no formato PDF.';
      input.value = '';
      return;
    }

    this.selectedFileName = file.name;
  }

  submit(event: Event): void {
    event.preventDefault();

    if (this.isUploading) {
      return;
    }

    const input = (event.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>('#invoice');
    const file = input?.files?.[0];

    if (!file) {
      this.errorMessage = 'Selecione uma fatura em PDF para continuar.';
      return;
    }

    if (!this.isPdfFile(file)) {
      this.errorMessage = 'Envie um arquivo no formato PDF.';
      input.value = '';
      return;
    }

    this.isUploading = true;
    this.simulationService.simulateInvoice(file).subscribe((pendingSimulation) => {
      this.simulationService.savePendingSimulation(pendingSimulation);
      this.router.navigateByUrl('/simulacao/processando');
    });
  }

  private isPdfFile(file: File): boolean {
    return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
  }
}
