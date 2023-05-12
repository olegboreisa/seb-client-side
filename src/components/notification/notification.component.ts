import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from "./notification.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {

  public showNotification = false;
  public errorMessage = '';
  public notSub: Subscription | undefined;

  constructor(private notificationService: NotificationService) {
    this.notSub = this.notificationService.notification$
      .subscribe((message: string) => {
        this.errorMessage = message;
        this.showNotification = true;
        setTimeout(() => {
          this.closeNotification();
        }, 3000);
      });
  }

  public ngOnInit(): void { }

  public closeNotification(): void {
    this.showNotification = false;
    this.errorMessage = '';
  }

  public ngOnDestroy(): void {
    this.notSub?.unsubscribe();
  }

}
