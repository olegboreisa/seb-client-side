import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public currentLang: string;

  constructor(private translateService: TranslateService) {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.translateService.use(this.currentLang);
  }

  public ngOnInit() { }

  public changeLang(selectedLang: string): void {
    localStorage.setItem('lang', selectedLang)
    this.currentLang = selectedLang;
    this.translateService.use(selectedLang);
  }

  public ngOnDestroy(): void { }
}
