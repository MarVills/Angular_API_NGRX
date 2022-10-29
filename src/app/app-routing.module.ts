import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './views/authentication/login-page/login-page.component';
import { RegisterPageComponent } from './views/authentication/register-page/register-page.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './views/authentication/forgot-password/forgot-password.component';
// import { AuthGuardService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';
import { ErrorComponent } from './views/error/error.component';



const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate :[AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}