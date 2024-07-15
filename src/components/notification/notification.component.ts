import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../app/service/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  message: string | null = null;
  type: 'success' | 'error' | null = null;

  private subscriptions: Subscription[] = [];

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    const sub = this.notificationService.notifications$.subscribe((notification: Notification) => {
      this.message = notification.message;
      this.type = notification.type;
      setTimeout(() => {
        this.message = null;
        this.type = null;
      }, 3000);
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
