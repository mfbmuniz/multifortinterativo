import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LOCAL_STORAGE_KEYS } from '../configs/local-storage-keys.config';
import { InvoiceFileInfo, PendingSimulation, Simulation } from '../entities/simulation.entity';
import { SimulationStatus } from '../entities/simulation-status.entity';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  constructor(private readonly storage: StorageService) {}

  simulateInvoice(file: File): Observable<PendingSimulation> {
    const invoiceFile: InvoiceFileInfo = {
      name: file.name,
      type: file.type,
      size: file.size
    };

    this.storage.setItem(LOCAL_STORAGE_KEYS.LAST_INVOICE, invoiceFile);

    // Futuramente este delay sera substituido pela resposta real do backend apos analisar o PDF.
    return of({
      selectedSetupId: 'setup-ideal',
      invoiceFile,
      consumptionKwh: 450,
      currentBillValue: 420,
      solarBillValue: 50
    }).pipe(delay(300));
  }

  getLastInvoice(): InvoiceFileInfo | null {
    return this.storage.getItem<InvoiceFileInfo>(LOCAL_STORAGE_KEYS.LAST_INVOICE);
  }

  getPendingSimulation(): PendingSimulation | null {
    return this.storage.getItem<PendingSimulation>(LOCAL_STORAGE_KEYS.PENDING_SIMULATION);
  }

  savePendingSimulation(pending: PendingSimulation): void {
    this.storage.setItem(LOCAL_STORAGE_KEYS.PENDING_SIMULATION, pending);
  }

  clearPendingSimulation(): void {
    this.storage.removeItem(LOCAL_STORAGE_KEYS.PENDING_SIMULATION);
  }

  getSimulations(): Simulation[] {
    return this.storage.getItem<Simulation[]>(LOCAL_STORAGE_KEYS.SIMULATIONS) ?? [];
  }

  getByUser(userId: string): Simulation[] {
    return this.getSimulations().filter((simulation) => simulation.userId === userId);
  }

  getBySeller(sellerId: string): Simulation[] {
    return this.getSimulations().filter((simulation) => simulation.assignedSellerId === sellerId);
  }

  createSimulation(userId: string, pending: PendingSimulation): Simulation {
    const simulation: Simulation = {
      id: crypto.randomUUID(),
      userId,
      selectedSetupId: pending.selectedSetupId,
      invoiceFileName: pending.invoiceFile?.name,
      invoiceFileType: pending.invoiceFile?.type,
      invoiceFileSize: pending.invoiceFile?.size,
      consumptionKwh: pending.consumptionKwh,
      currentBillValue: pending.currentBillValue,
      solarBillValue: pending.solarBillValue,
      status: SimulationStatus.PENDING_ADMIN_ASSIGNMENT,
      createdAt: new Date().toISOString()
    };

    this.storage.setItem(LOCAL_STORAGE_KEYS.SIMULATIONS, [simulation, ...this.getSimulations()]);
    this.clearPendingSimulation();
    return simulation;
  }

  assignSeller(simulationId: string, sellerId: string): void {
    this.updateSimulation(simulationId, {
      assignedSellerId: sellerId,
      status: SimulationStatus.ASSIGNED_TO_SELLER
    });
  }

  updateStatus(simulationId: string, status: SimulationStatus): void {
    this.updateSimulation(simulationId, { status });
  }

  private updateSimulation(simulationId: string, changes: Partial<Simulation>): void {
    const simulations = this.getSimulations().map((simulation) =>
      simulation.id === simulationId
        ? { ...simulation, ...changes, updatedAt: new Date().toISOString() }
        : simulation
    );

    this.storage.setItem(LOCAL_STORAGE_KEYS.SIMULATIONS, simulations);
  }
}
