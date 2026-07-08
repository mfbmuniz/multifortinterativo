import { Component, Input } from '@angular/core';
import { SIMULATION_STATUS_LABELS, SimulationStatus } from '../../../entities/simulation-status.entity';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: SimulationStatus;
  labels = SIMULATION_STATUS_LABELS;
}
