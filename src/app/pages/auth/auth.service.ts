import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RegistrationForm} from "./register/model/registration.form";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  public register(form: RegistrationForm): Observable<void> {
    return this.http.post<void>('/api/auth/register', form);
  }

  public login(form: RegistrationForm): Observable<string> {
    return this.http.post('/api/auth/login', form , {responseType: "text"});
  }
}
