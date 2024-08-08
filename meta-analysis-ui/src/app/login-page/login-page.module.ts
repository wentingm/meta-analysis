import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginPageRoutingModule } from './login-page-routing.module';
import { LoginPageComponent } from './login-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    SignUpComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    LoginPageRoutingModule
  ]
})
export class LoginPageModule { }
