import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HandleTokenService } from './handle-token.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(
    private injector: Injector, 
    private handleToken: HandleTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let authService = this.injector.get(HandleTokenService)
    let tokenizedReq = req;
    const token = this.handleToken.getToken();
    const TOKEN_HEADER_KEY = 'Authorization';

    if(token != null){
      tokenizedReq.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
        // {
        //   Authorization: 'Bearer '+authService.getToken();  
        // }
    }
    
    console.log("Tokenized Req: "+tokenizedReq);
    return next.handle(tokenizedReq)
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
];
