import { NgModule } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Views/authentication/login-page/login-page.component';
import { RegisterPageComponent } from './Views/authentication/register-page/register-page.component';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './Views/authentication/forgot-password/forgot-password.component';
// import { AuthGuardService } from './shared/auth.service';
import { AuthGuard } from './shared/auth.guard';



const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate :[AuthGuard] },
  // { path: '', component: DashboardComponent, canActivate :[AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}