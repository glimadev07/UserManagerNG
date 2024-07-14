import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<string>();
  public notifications$ = this.notificationSubject.asObservable();

  notify(message: string) {
    this.notificationSubject.next(message);
  }
}
