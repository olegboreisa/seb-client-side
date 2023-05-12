import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {CookieService} from "ngx-cookie-service";
import {Subscription} from "rxjs";
import {UserData} from "../auth/login/model/user.data";
import {NotificationService} from "../../../components/notification/notification.service";
import {JwtService} from "../../../auth/jwt.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public user: UserData | undefined;
  public authSub: Subscription | undefined;

  constructor(private router: Router,
              private authService: AuthService,
              private jwtService: JwtService,
              private notificationService: NotificationService,
              private cookieService: CookieService) {
  }

  public ngOnInit(): void {
    let userData = this.jwtService.getUsernameAndRole();
    if (userData) {
      this.user = userData;
    }
  }

  public openForm(): void {
    this.router.navigate(['/form']).then();
  }

  public newProduct(): void {
    this.router.navigate(['/new']).then();
  }

  public getProductList(): void {
    this.router.navigate(['/list']).then();
  }

  public logout(): void {
    this.cookieService.delete('accessToken');
    this.router.navigate(['/login']).then();
  }

  public ngOnDestroy(): void {
      this.authSub?.unsubscribe();
    }

}
