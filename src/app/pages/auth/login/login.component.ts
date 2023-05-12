import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {CookieService} from "ngx-cookie-service";
import {Subscription} from "rxjs";
import {NotificationService} from "../../../../components/notification/notification.service";
import {invalidPassNumber} from "../../../../validators/validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../shared/user-info.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public authSub: Subscription | undefined;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router,
              private cookieService: CookieService) {

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([invalidPassNumber(), Validators.required])],
    });
  }

  public ngOnInit(): void { }

  public login(): void {
    this.authSub = this.authService.login(this.form.value)
      .subscribe((token) => {
        if (token) {
          this.setToken(token);
          this.router.navigate(['/home']).then();
        } else {
          this.notificationService.showError('login')
        }
      }, () => {
        this.notificationService.showError('login');
      });
  }

  private setToken(token: string): void {
    this.cookieService.set('accessToken', token);
  }

  public back(): void {
    this.router.navigate(['/auth']).then();
  }

  public ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
