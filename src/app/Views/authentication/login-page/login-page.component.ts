import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { LoginService } from './login.service';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  _loginForm!: FormGroup; 

  constructor( 
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private handleToken: HandleTokenService,
    private router: Router) { }

  ngOnInit(): void {
    this.loginForm()
    this.handleToken.autoLogin()
  }

  loginForm(){
    this._loginForm = this.formBuilder.group({
      email:  new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(3)]),
     });
  }
  
  onLogin(){
    this.loginService.onLogin(this._loginForm.value).subscribe({
      next: (response) => {
        console.log(response.token)
        this.handleToken.saveToken(response.token);
        this.handleToken.saveUser(response);
      },
      error:(error) => console.log("LOGIN ERROR: "+error),
      complete: () => {
        this.router.navigate(['/dashboard'])
      } 
    }).unsubscribe;
  }


}
