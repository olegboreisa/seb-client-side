import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";
import {Subscription} from "rxjs";
import {invalidPassMatch, invalidPassNumber} from "../../../../validators/validators";
import {NotificationService} from "../../../../components/notification/notification.service";
import {RegistrationForm} from "./model/registration.form";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../../../shared/user-info.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public authSub: Subscription | undefined;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private notificationService: NotificationService,
              private router: Router) {

    this.form = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      password: ['', Validators.compose([invalidPassNumber(), Validators.required])],
      repeatPassword: ['', Validators.compose([invalidPassMatch('password'), invalidPassNumber(), Validators.required])]
    });
  }

  public ngOnInit(): void { }

  public register(): void {
    this.authSub = this.authService.register(
      new RegistrationForm(this.form.value)).subscribe(() => {
        this.router.navigate(['/login']).then();
      }, () => {
        this.notificationService.showError('register');
      });
  }

  public ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
