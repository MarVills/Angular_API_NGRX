import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ForgotPasswordComponent } from './views/authentication/forgot-password/forgot-password.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPageComponent } from './views/authentication/login-page/login-page.component';
import { RegisterPageComponent } from './views/authentication/register-page/register-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HandleTokenService } from './shared/handle-token.service';
import { TokenInterceptorService } from './shared/token-interceptor.service';
import { AuthGuardService } from './shared/auth.service';
import { AddDialogComponent } from './views/components/add-dialog/add-dialog.component';
import { DataDetailsComponent } from './views/components/data-details/data-details.component';
import { StoreModule } from '@ngrx/store';
import * as product from './store/products/product.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './store/products/product.effects';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ErrorComponent } from './views/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AddDialogComponent,
    DataDetailsComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSidenavModule,
    FontAwesomeModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ product: product.productReducer }),
    EffectsModule.forRoot([ProductEffects]),
    MatTableModule,
    MatPaginatorModule,
  ],
  exports: [],
  providers: [
    HandleTokenService,
    // AuthGuardService,
    // { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
