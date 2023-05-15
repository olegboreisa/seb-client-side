import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IncomeFormComponent } from './pages/income/income-form.component';
import { ProductComponent } from './pages/product/product.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ProductFormComponent } from './pages/product/create/product-form.component';
import {RegisterComponent} from "./pages/auth/register/register.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {AuthService} from "./pages/auth/auth.service";
import {ProductService} from "./pages/product/product.service";
import {AuthInterceptor} from "../auth/auth-interceptor";
import {TranslateService} from "@ngx-translate/core";
import {AppTranslateModule} from "../modules/app-translate.module";
import {ValidationComponent} from "../validators/validation.component";
import {NotificationComponent} from "../components/notification/notification.component";
import {NotificationService} from "../components/notification/notification.service";
import { ProductListComponent } from './pages/product/list/product-list.component';
import {NgxPaginationModule} from "ngx-pagination";
import { ProductEditComponent } from './pages/product/edit/product-edit.component';
import { NavComponent } from './pages/nav/nav.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AboutComponent } from './pages/about/about.component';
import {BasicComponent} from "../components/basic/basic.component";
import { ContactsComponent } from './pages/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IncomeFormComponent,
    ProductComponent,
    ProductFormComponent,
    RegisterComponent,
    LoginComponent,
    ValidationComponent,
    NotificationComponent,
    ProductListComponent,
    ProductEditComponent,
    NavComponent,
    FooterComponent,
    AboutComponent,
    BasicComponent,
    ContactsComponent
  ],
    imports: [
        BrowserModule,
        CommonModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AppTranslateModule,
        NgxPaginationModule
    ],
  providers: [
    ProductService,
    AuthService,
    TranslateService,
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
