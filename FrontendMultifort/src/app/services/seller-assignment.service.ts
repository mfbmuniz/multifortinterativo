import { Injectable } from '@angular/core';
import { SimulationService } from './simulation.service';

@Injectable({ providedIn: 'root' })
export class SellerAssignmentService {
  constructor(private readonly simulationService: SimulationService) {}

  assign(simulationId: string, sellerId: string): void {
    this.simulationService.assignSeller(simulationId, sellerId);
  }
}
