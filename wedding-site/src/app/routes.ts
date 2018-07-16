import { Routes } from "@angular/router";
import { WishListComponent } from "src/app/wish-list/wish-list.component";
import { WishDetailComponent } from "src/app/wish-list/wish-detail/wish-detail.component";
import { WishGuard } from "src/app/wish-list/wish.guard";
import { AboutComponent } from "src/app/about/about.component";
import { HomeComponent } from "src/app/home/home.component";
import { NotFoundComponent } from "src/app/not-found/not-found.component";
import { MenuComponent } from "src/app/menu/menu.component";
import { AuthGuard } from "./user/auth.guard";

//TODO - Look into resolvers
//TODO - Extract nav bar into own component
//TODO - Extract wish row into own component
//TODO - Use barrels through index.ts files for massive imports in files. Barrels are used to export parts of your program.

export const ROUTES: Routes = [
  {
    path: 'wishlist',
    component: WishListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wishlist/:id',
    component: WishDetailComponent,
    canActivate: [WishGuard]
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
      path: 'user',
      loadChildren:'./user/user.module#UserModule'
  },

  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }

];
