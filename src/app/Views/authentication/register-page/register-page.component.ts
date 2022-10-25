import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router} from '@angular/router';
import { HandleTokenService } from 'src/app/shared/handle-token.service';
import { HeaderVisibility } from 'src/app/shared/header-visibility.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  _registerForm!: FormGroup; 

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private handleToken: HandleTokenService,
    private router: Router,
    private headerVisibility: HeaderVisibility) { }

  ngOnInit(): void {this.registerForm()}
 
  registerForm(){
    this._registerForm = this.formBuilder.group({
      name: ["",Validators.required],
      email:  new FormControl("",[Validators.required, Validators.email]),
      password: new FormControl("",[Validators.required, Validators.minLength(3)]),
      password_confirmation: new FormControl("",[Validators.required, Validators.minLength(3)]),
     });
  }

  onRegister(){
    this.registerService.postUserData(this._registerForm.value).subscribe({
      next: (response) => {
        console.log(response.token);
        this.handleToken.saveToken(response.token);
        this.handleToken.saveUser(response);     
      },
      error: (error) => console.log("REGISTER ERROR: "+error),
      complete:()=> {
        this.headerVisibility.setShow(this.handleToken.userLoggedIn)
        this.router.navigate(['/dashboard'])
      }
    }).unsubscribe;
  }
}

