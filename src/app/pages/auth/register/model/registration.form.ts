import {Registration} from "./registration";

export class RegistrationForm {
  public username: string;
  public password: string;

  constructor(form: Registration) {
    this.username = form.username;
    this.password = form.password;
  }
}
