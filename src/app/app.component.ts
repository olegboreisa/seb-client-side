import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private translateService: TranslateService) {
    this.translateService.use(localStorage.getItem('lang') || 'en');
  }

  public ngOnInit() {
  }
}
