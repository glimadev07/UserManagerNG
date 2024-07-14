import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  message: string | null = null;
  type: 'success' | 'error' | null = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifications$.subscribe((notification: Notification) => {
      this.message = notification.message;
      this.type = notification.type;
      setTimeout(() => {
        this.message = null;
        this.type = null;
      }, 3000);
    });
  }
}
