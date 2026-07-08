import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  success(message: string): string {
    return message;
  }

  error(message: string): string {
    return message;
  }
}
