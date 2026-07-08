import { Component, EventEmitter, inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SolarSetup } from '../../../entities/solar-setup.entity';

@Component({
  selector: 'app-setup-form-dialog',
  imports: [ReactiveFormsModule],
  templateUrl: './setup-form-dialog.component.html',
  styleUrl: './setup-form-dialog.component.scss'
})
export class SetupFormDialogComponent implements OnChanges {
  private readonly formBuilder = inject(FormBuilder);
  @Input() setup?: SolarSetup;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<SolarSetup>();

  form = this.formBuilder.group({
    id: [''],
    name: ['', Validators.required],
    category: ['', Validators.required],
    panelQuantity: [1, [Validators.required, Validators.min(1)]],
    estimatedPower: [1, [Validators.required, Validators.min(1)]],
    estimatedGeneration: [100, [Validators.required, Validators.min(1)]],
    estimatedSavings: [80, [Validators.required, Validators.min(1)]],
    estimatedPrice: [10000, [Validators.required, Validators.min(1)]],
    estimatedPaybackMonths: [36, [Validators.required, Validators.min(1)]],
    areaNeeded: [10, [Validators.required, Validators.min(1)]],
    inverter: ['', Validators.required],
    description: ['', Validators.required],
    benefits: ['Economia mensal, Monitoramento remoto'],
    includedItems: ['Placas solares, Inversor, Projeto homologado'],
    isRecommended: [false]
  });

  ngOnChanges(): void {
    if (this.setup) {
      this.form.patchValue({
        ...this.setup,
        benefits: this.setup.benefits.join(', '),
        includedItems: this.setup.includedItems.join(', ')
      });
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    this.saved.emit({
      id: value.id || crypto.randomUUID(),
      name: value.name ?? '',
      category: value.category ?? '',
      panelQuantity: Number(value.panelQuantity),
      estimatedPower: Number(value.estimatedPower),
      estimatedGeneration: Number(value.estimatedGeneration),
      estimatedSavings: Number(value.estimatedSavings),
      estimatedPrice: Number(value.estimatedPrice),
      estimatedPaybackMonths: Number(value.estimatedPaybackMonths),
      areaNeeded: Number(value.areaNeeded),
      inverter: value.inverter ?? '',
      description: value.description ?? '',
      benefits: this.toList(value.benefits),
      includedItems: this.toList(value.includedItems),
      isRecommended: Boolean(value.isRecommended)
    });
  }

  private toList(value?: string | null): string[] {
    return (value ?? '').split(',').map((item) => item.trim()).filter(Boolean);
  }
}
