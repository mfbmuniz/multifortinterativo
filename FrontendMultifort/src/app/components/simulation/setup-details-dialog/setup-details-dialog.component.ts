import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { SolarSetup } from '../../../entities/solar-setup.entity';

@Component({
  selector: 'app-setup-details-dialog',
  imports: [CurrencyPipe],
  templateUrl: './setup-details-dialog.component.html',
  styleUrl: './setup-details-dialog.component.scss'
})
export class SetupDetailsDialogComponent {
  @Input({ required: true }) setup!: SolarSetup;
  @Output() close = new EventEmitter<void>();
  @Output() selected = new EventEmitter<SolarSetup>();
}
