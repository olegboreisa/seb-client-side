import {Component, OnDestroy, OnInit} from '@angular/core';
import {JwtService} from "../../../auth/jwt.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {UserData} from "../auth/login/model/user.data";
import {Subscription} from "rxjs";
import {menu} from "./model/menu";
import {MenuData} from "./model/menu.data";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  public menu: Array<MenuData> = menu;
  public isLoggedIn: boolean = false;
  public menuOpened: boolean = false;
  public user: UserData | null |  undefined;

  public authSub: Subscription | undefined;

  constructor(private jwtService: JwtService,
              private cookieService: CookieService,
              private router: Router,
              private authService: AuthService) {

    this.authSub = this.authService.user$
      .subscribe((user) => {
        this.user = user;
        this.isLoggedIn = true;
      });
  }

  public ngOnInit(): void {
    this.isLoggedIn = !this.jwtService.isExpired();
    this.user = this.jwtService.getUsernameAndRole();
  }

  public logout(): void {
    this.cookieService.delete('accessToken');
    this.router.navigate(['/login']).then(() => {
      this.isLoggedIn = false;
      this.user = null;
    });
  }

  public showMenu() {
    this.menuOpened = !this.menuOpened;
  }

  public toService(serviceRoute: string): void {
    this.router.navigate([serviceRoute])
      .then(() => {
      this.menuOpened = false;
    });
  }

  public closeMenu(): void {
    this.menuOpened = false;
  }

  public ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

}
