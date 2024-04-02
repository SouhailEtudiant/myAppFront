import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { ListPrioriteComponent } from './Component/ParamPriorite/list-priorite/list-priorite.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './Component/login/login.component';
import { UsersComponent } from './Component/users/users.component';
import { DashboardV1Component } from './Component/dashboard-v1/dashboard-v1.component';
import { UserProfileComponent } from './Component/users/user-profile/user-profile.component';
import { StatusListComponent } from './Component/ParamStatus/status-list/status-list.component';
import { TypeListComponent } from './Component/ParamType/type-list/type-list.component';
import { RoleListComponent } from './Component/users/role-list/role-list.component';

const routes: Routes = [
  {path : '' , title : 'Login Page' , component:LoginComponent} ,
  {path : 'samplepage' , title : 'Sample Page' , component:SamplepageComponent} ,
  {path : 'priorite' , title : 'Priorite Page' , component:ListPrioriteComponent} ,
  {path : 'status' , title : 'Status Page' , component:StatusListComponent} ,
  {path : 'type' , title : 'Type Page' , component:TypeListComponent} ,
  {path : 'users' , title : 'Gestion Des Utilisateurs Page' , component:UsersComponent} ,
  {path : 'dashboard' , title : 'Dashboard Page' , component:DashboardV1Component} ,
  {path : 'role' , title : 'Role Page' , component:RoleListComponent} ,
  {path : 'login' , title : 'login Page' , component:LoginComponent} ,
  {path : 'profile' , title : 'Profile Utilisateur' , component:UserProfileComponent} ,
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
