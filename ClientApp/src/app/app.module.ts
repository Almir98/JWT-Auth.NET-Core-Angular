import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InfoComponent } from './components/info/info.component';
import { NavComponent } from './components/nav/nav.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { appRoutes } from './routes';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/_services/auth.service';
import { AlertifyService } from 'src/_services/alertify.service';
import { CustomerService } from 'src/_services/customer.service';

@NgModule({
  declarations: [	
    AppComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      InfoComponent,
      NavComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuthService,
    AlertifyService,
    CustomerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
