import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<string>();
  public notification$ = this.notificationSubject.asObservable();

  public showError(message: string): void {
    this.notificationSubject.next(message);
  }

}
