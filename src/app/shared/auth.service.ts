import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { HandleTokenService } from './handle-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registerUser(data: any): Observable<any>{
    var response$ = this.http.post<any>(environment.API_URL+'api/register', data);
    return response$;
  }

  loginUser(data: any): Observable<any>{
    var response$ = this.http.post<any>(environment.API_URL+'api/login', data)
    return response$;
  }
}

export class AuthGuardService implements CanActivate {

  constructor(private handleToken: HandleTokenService){}
  userLoggedIn = true;
  canActivate() {
    if (this.userLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}
