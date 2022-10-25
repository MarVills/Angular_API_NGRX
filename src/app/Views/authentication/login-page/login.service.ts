import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private authService: AuthService) { }

  onLogin(data: any): Observable<any>{
    var resposne = this.authService.loginUser(data);
    return resposne;
  }
}
