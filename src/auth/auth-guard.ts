import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private cookieService: CookieService,
              private router: Router,
              private jwtService: JwtService) {
  }

  public canActivate(): boolean {
    if (!this.jwtService.isExpired()) {
      return true;
    } else {
      this.router.navigate(['/login']).then(() => {
        this.cookieService.delete('accessToken');
      });
      return false;
    }
  }
}
