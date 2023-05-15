import { Injectable } from '@angular/core';
import jwt_decode, {JwtPayload} from 'jwt-decode';
import {CookieService} from "ngx-cookie-service";
import {UserData} from "../app/pages/auth/login/model/user.data";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private cookieService: CookieService) { }

  public getUsernameAndRole(): UserData | null {
    const token = this.getDecodedToken();
    if (token) {
      // @ts-ignore
      return new UserData(token.sub, token.role[0].authority);
    }
    return null;
  }

  public isExpired(): boolean {
    const token = this.getDecodedToken();
    if (token) {
      const expiry = token.exp as number;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    } else {
      return true;
    }
  }

  private getDecodedToken(): JwtPayload | null {
    const token = this.cookieService.get('accessToken');
    if (token) {
      return jwt_decode(token);
    }
    return null;
  }
}
