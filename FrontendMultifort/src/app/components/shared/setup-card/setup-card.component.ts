import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolarSetup } from '../../../entities/solar-setup.entity';

@Component({
  selector: 'app-setup-card',
  templateUrl: './setup-card.component.html',
  styleUrl: './setup-card.component.scss'
})
export class SetupCardComponent {
  @Input({ required: true }) setup!: SolarSetup;
  @Output() details = new EventEmitter<SolarSetup>();
  @Output() selected = new EventEmitter<SolarSetup>();
}
