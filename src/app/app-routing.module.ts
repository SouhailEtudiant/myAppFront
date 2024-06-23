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
import { ProjetListComponent } from './Component/Projet/projet-list/projet-list.component';
import { ProjetListForUserComponent } from './Component/Projet/projet-list-for-user/projet-list-for-user.component';
import { TacheListComponent } from './Component/Tache/tache-list/tache-list.component';
import { BoardssComponent } from './Component/bardtest/boardss/boardss.component';
import { ImputationComponent } from './Component/imputation/imputation.component';
import { MembreProjetComponent } from './Component/MembreProjet/membre-projet.component';
import { DashboardUserComponent } from './Component/dashboard-user/dashboard-user.component';
import { AccessDeniedComponent } from './Component/access-denied/access-denied.component';

const routes: Routes = [
  {path : '' , title : 'Login Page' , component:LoginComponent} ,
  {path : 'samplepage' , title : 'Sample Page' , component:SamplepageComponent} ,
  {path : 'priorite' , title : 'Priorite Page' , component:ListPrioriteComponent} ,
  {path : 'status' , title : 'Status Page' , component:StatusListComponent} ,
  {path : 'type' , title : 'Type Page' , component:TypeListComponent} ,
  {path : 'users' , title : 'Gestion Des Utilisateurs Page' , component:UsersComponent} ,
  {path : 'dashboard' , title : 'Dashboard Page' , component:DashboardV1Component} ,
  {path : 'dashboardUser' , title : 'Dashboard Page' , component:DashboardUserComponent} ,
  {path : 'role' , title : 'Role Page' , component:RoleListComponent} ,
  {path : 'login' , title : 'login Page' , component:LoginComponent} ,
  {path : 'projet' , title : 'Projet Page' , component:ProjetListComponent} ,
  {path : 'projetUser' , title : 'Projet Page' , component:ProjetListForUserComponent} ,
  {path : 'profile' , title : 'Profile Utilisateur' , component:UserProfileComponent} ,
  {path : 'tache' , title : 'Liste Des Taches' , component:TacheListComponent} ,
  {path : 'imputation' , title : 'Liste Des Imputation' , component:ImputationComponent} ,
  {path : 'accessDenied' , title : 'accessDenied' , component:AccessDeniedComponent} ,
  {path : 'board/:id' , title : 'Liste Des Taches' , component:BoardssComponent} ,
  {path : 'membre/:id' , title : 'Liste Des Membres Projets' , component:MembreProjetComponent} ,
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
