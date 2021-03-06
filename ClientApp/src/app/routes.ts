import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { InfoComponent } from './components/info/info.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BaseComponent } from './components/base/base.component';

export const appRoutes: Routes = [

    {path:'home',component: HomeComponent},
    {path:'info',component: InfoComponent},
    {path:'login',component: LoginComponent},
    {path:'register',component: RegisterComponent},
    {path:'information',component: BaseComponent},
    {path:'**',component: HomeComponent,pathMatch:'full'}
]
