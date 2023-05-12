import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {JwtService} from "../../../auth/jwt.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['../../../shared/main.scss']
})
export class AuthComponent implements OnInit {

  public currentLang: string;

  constructor(private router: Router,
              private translateService: TranslateService,
              private jwtService: JwtService) {

    this.currentLang = localStorage.getItem('lang') || 'en';
  }

  public ngOnInit(): void {
    if (!this.jwtService.isExpired()) {
      this.router.navigate(['/home']).then();
    }
  }

  public login(): void {
    this.router.navigate(['/login']).then();
  }

  public register(): void {
    this.router.navigate(['/register']).then();
  }

  public changeLang(selectedLang: string): void {
    localStorage.setItem('lang', selectedLang)
    this.currentLang = selectedLang;
    this.translateService.use(selectedLang);
  }
}
