import { Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  token_key = 'auth-token';

  constructor() {}

  getToken(){
    return localStorage.getItem(this.token_key);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let tokenizedReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.getToken()}`
      }
    })
    // console.log("token",tokenizedReq)
    return next.handle(tokenizedReq);
  }
}

export const aauthInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ];
  


