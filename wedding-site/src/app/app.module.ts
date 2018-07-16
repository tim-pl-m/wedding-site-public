import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {
  WishDetailComponent,
  WishListComponent,
  WishService,
  WishGuard } from './wish-list/index';

import { WeddingApp } from './app.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SharedModule} from './shared/shared.module';
import { HomeComponent } from './home/home.component';

import { ROUTES } from './routes';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from 'src/app/user/auth.service';
import { CommonService } from './shared/common.service';
import { fakeBackendProvider } from './shared/fake-backend';
import { AuthGuard } from './user/auth.guard';
import { ReactiveFormsModule } from '../../node_modules/@angular/forms';


@NgModule({
  declarations: [
    WeddingApp,
    WishListComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    WishDetailComponent,
    NavbarComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [WishService,
    WishGuard,
    AuthService,
    AuthGuard,
    CommonService,
    // provider used to create fake backend
    fakeBackendProvider],
  bootstrap: [WeddingApp]
})
export class AppModule { }
