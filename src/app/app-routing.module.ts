import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {IncomeFormComponent} from "./pages/income/income-form.component";
import {ProductComponent} from "./pages/product/product.component";
import {ProductFormComponent} from "./pages/product/create/product-form.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {AuthGuard} from "../auth/auth-guard";
import {ProductListComponent} from "./pages/product/list/product-list.component";
import {ProductEditComponent} from "./pages/product/edit/product-edit.component";
import {AboutComponent} from "./pages/about/about.component";
import {HomeComponent} from "./pages/home/home.component";
import {ContactsComponent} from "./pages/contacts/contacts.component";

export const routes: Routes = [
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
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
