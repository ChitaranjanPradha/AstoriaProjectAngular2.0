import { LoginPageComponent } from './login-page/login-page.component';
import { AllowanceComponent } from './allowance/allowance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeattendanceComponent } from './employeeattendance/employeeattendance.component';
import { EmployeemasterComponent } from './employeemaster/employeemaster.component';
import { PracticeComponent } from './practice/practice.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Shared/auth.guard';
import { SignUpComponent } from './sign-up/sign-up.component';


const routes: Routes = [
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home', component: HomeComponent ,canActivate:[AuthGuard]},
  { path: 'employeemaster', component: EmployeemasterComponent ,canActivate:[AuthGuard]},
  { path: 'employeeattendance', component: EmployeeattendanceComponent ,canActivate:[AuthGuard]},
  { path: 'dashboard', component: DashboardComponent ,canActivate:[AuthGuard]},
  { path: 'practice', component: PracticeComponent ,canActivate:[AuthGuard]},
  { path: 'allowance', component: AllowanceComponent ,canActivate:[AuthGuard]},
  { path: 'signUp-page', component: SignUpComponent},
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: '**', component: LoginPageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }