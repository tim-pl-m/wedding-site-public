import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/app/user/login/login.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '../../../node_modules/@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(userRoutes)
  ],
  declarations: [LoginComponent, SignUpComponent]
})
export class UserModule { }
