import {ApiService} from "../services/api.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()

export class AuthService {

  LOGIN_API = 'auth/login';
  SIGNUP_API = 'auth/signup';

  constructor(
    private apiService: ApiService,
  ) { }

  login(params): Observable<any> {
    return this.apiService.post(this.LOGIN_API, params);
  }

  signup(params): Observable<any> {
    return this.apiService.post(this.SIGNUP_API, params);
  }
}
