import { LoginComponent } from "src/app/user/login/login.component";
import { Routes } from "@angular/router";
import { SignUpComponent } from "src/app/user/sign-up/sign-up.component";

export const userRoutes:Routes = [
    {
        path: 'login', 
        component: LoginComponent},
    {
        path: 'signup',
        component: SignUpComponent
    }
]