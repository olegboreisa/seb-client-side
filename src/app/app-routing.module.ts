import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IncomeFormComponent} from "./pages/income/income-form.component";
import {HomeComponent} from "./pages/home/home.component";
import {ProductComponent} from "./pages/product/product.component";
import {ProductFormComponent} from "./pages/product/create/product-form.component";
import {AuthComponent} from "./pages/auth/auth.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {AuthGuard} from "../auth/auth-guard";
import {ProductListComponent} from "./pages/product/list/product-list.component";
import {ProductEditComponent} from "./pages/product/edit/product-edit.component";

export const routes: Routes = [
  { path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'form',
    component: IncomeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  { path: 'product/:id',
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product',
    component: ProductComponent,
    canActivate: [AuthGuard]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
