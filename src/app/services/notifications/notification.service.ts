import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationMessageSubject = new BehaviorSubject<string | null>(null);
  notificationMessage$ = this.notificationMessageSubject.asObservable();

  showError(message: string) {
    this.notificationMessageSubject.next(message); 
  }

  clearMessage() {
    this.notificationMessageSubject.next(null); 
  }
}
