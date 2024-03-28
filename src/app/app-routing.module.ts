import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { ListPrioriteComponent } from './Component/ParamPriorite/list-priorite/list-priorite.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Component/login/login.component';
import { UsersComponent } from './Component/users/users.component';
import { DashboardV1Component } from './Component/dashboard-v1/dashboard-v1.component';
import { UserProfileComponent } from './Component/users/user-profile/user-profile.component';

const routes: Routes = [
  {path : '' , title : 'Login Page' , component:LoginComponent} ,
  {path : 'samplepage' , title : 'Sample Page' , component:SamplepageComponent} ,
  {path : 'priorite' , title : 'Priorite Page' , component:ListPrioriteComponent} ,
  {path : 'users' , title : 'Gestion Des Utilisateurs Page' , component:UsersComponent} ,
  {path : 'dashboard' , title : 'Dashboard Page' , component:DashboardV1Component} ,
  {path : 'login' , title : 'login Page' , component:LoginComponent} ,
  {path : 'profile' , title : 'Profile Utilisateur' , component:UserProfileComponent} ,
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
