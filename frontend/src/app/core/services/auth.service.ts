import { shareReplay, tap } from 'rxjs/operators'
import jwt_decode, { JwtPayload } from "jwt-decode";
import * as moment from 'moment';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth.model';
import { Observable } from 'rxjs';
import { PATH_CONFIG } from 'src/app-config/routes/path.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login(mail:string, password:string): Observable<AuthModel> {
    return this.http.post<AuthModel>(PATH_CONFIG.LOGIN_URL, { mail, password })
      .pipe(
        tap(res => this.setSession(res)),
        shareReplay()
      );
  }

  public logout(): void {
    localStorage.removeItem('idUser');
    localStorage.removeItem('login');
    localStorage.removeItem("token");
  }

  public isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  private setSession(authResult: AuthModel): void {
    const { exp } = jwt_decode<JwtPayload>(authResult.token);
    const expiresAt = exp * 1000;
    console.log(new Date(expiresAt));

    localStorage.setItem('idUser', authResult.idUser);
    localStorage.setItem('login', authResult.login);
    localStorage.setItem('avatar', authResult.avatar);
    localStorage.setItem("token", authResult.token);
  }

  private getExpiration(): moment.Moment {
    const token = localStorage.getItem("token");

    if (token) {
      const { exp } = jwt_decode<JwtPayload>(token);
      const expiresAt = exp * 1000;
      return moment(expiresAt);
    }

    return null;
  }
}
