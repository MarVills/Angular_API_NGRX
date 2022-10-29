import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HandleTokenService {
  token_key = 'auth-token';
  user_key = 'auth-use';
  token_expire_key = 'token-expire';
  token = this.getToken(); 
  userLoggedIn = this.token != "" ? true: false ;
  userData = this.getUser();
  

  constructor(private router: Router) { }

  saveToken(token: string) {
    localStorage.removeItem(this.token_key);
    localStorage.setItem(this.token_key, token);
  }
  getToken(){
    return localStorage.getItem(this.token_key);
  }

  saveUser(user: any) {
    localStorage.removeItem(this.user_key);
    localStorage.setItem(this.user_key, JSON.stringify(user));
    localStorage.removeItem(this.token_expire_key);
    localStorage.setItem(this.token_expire_key, user.user.created_at);
  }
  
  getUser() {
    return JSON.parse(localStorage.getItem(this.user_key)!);
  }

  signOut() {
    localStorage.clear();
  }
  
  autoLogout(){
    const tokenExpire = localStorage.getItem(this.token_expire_key)
    const expireTime  = +(new Date(tokenExpire!).getTime())/1000;
    const timeNow = +(new Date().getTime())/1000;
    const timeFrame =  (timeNow) - (expireTime);
    console.log(`timeframe: ${timeFrame}`)
    const signoutTime = parseInt(((timeFrame)).toString());
    console.log(signoutTime/60)

    if(signoutTime > 0){
      setTimeout(() => {
        this.signOut();
        this.router.navigate(['/login']);
      }, signoutTime);
    }else{
      this.router.navigate(['/login']);
    }
  }
  autoLogin(){
    if(this.getToken() != "" && this.getToken() != null){
      this.router.navigate(['/dashboard']);
    }
  }

}

