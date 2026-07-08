import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../entities/user.entity';

@Component({
  selector: 'app-assign-seller-dialog',
  imports: [FormsModule],
  templateUrl: './assign-seller-dialog.component.html',
  styleUrl: './assign-seller-dialog.component.scss'
})
export class AssignSellerDialogComponent {
  @Input({ required: true }) sellers: User[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() assigned = new EventEmitter<string>();
  selectedSellerId = '';
}
