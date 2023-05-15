import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {RegistrationForm} from "./register/model/registration.form";
import {UserData} from "./login/model/user.data";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

  private userSubject = new Subject<UserData>();
  public user$ = this.userSubject.asObservable();

  public triggerUser(user: UserData): void {
    this.userSubject.next(user);
  }

  public register(form: RegistrationForm): Observable<void> {
    return this.http.post<void>('/api/auth/register', form);
  }

  public login(form: RegistrationForm): Observable<string> {
    return this.http.post('/api/auth/login', form , {responseType: "text"});
  }
}
