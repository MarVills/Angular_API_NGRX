import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HandleTokenService } from './handle-token.service';
import { Router } from '@angular/router';
import { HeaderVisibility } from './header-visibility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private handleToken: HandleTokenService, 
    private router: Router,
    // private header:
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.handleToken.getToken() != null && this.handleToken.getToken() != ""){
        // console.log("exec ===============")
        // this.router.navigate(['/dashboard'])
        // this.router.navigate(['/login'])
        return true;
      }else{
        this.router.navigate(['/login'])
        return false;
      }

    }
}
