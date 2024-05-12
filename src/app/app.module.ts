import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { HeaderComponent } from './header/header.component';
import { ListPrioriteComponent } from './Component/ParamPriorite/list-priorite/list-priorite.component';
import { FilterPipe } from './filter.pipe';
import { BsModalRef, ModalModule ,BsModalService  } from 'ngx-bootstrap/modal';
import { PrioriteDetailComponent } from './Component/ParamPriorite/priorite-detail/priorite-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './Component/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { UploadComponent } from './Component/upload/upload.component';
import { UsersComponent } from './Component/users/users.component';
import { UserDetailComponent } from './Component/users/user-detail/user-detail.component';
import { DashboardV1Component } from './Component/dashboard-v1/dashboard-v1.component';
import { ChangeRoleComponent } from './Component/users/change-role/change-role.component';
import { UpdatePasswordComponent } from './Component/users/update-password/update-password.component';
import { UserProfileComponent } from './Component/users/user-profile/user-profile.component';
import { StatusListComponent } from './Component/ParamStatus/status-list/status-list.component';
import { StatusDetailComponent } from './Component/ParamStatus/status-detail/status-detail.component';
import { TypeListComponent } from './Component/ParamType/type-list/type-list.component';
import { TypeDetailComponent } from './Component/ParamType/type-detail/type-detail.component';
import { AddRoleComponent } from './Component/users/add-role/add-role.component';
import { RoleListComponent } from './Component/users/role-list/role-list.component';
import { ProjetListComponent } from './Component/Projet/projet-list/projet-list.component';
import { ProjetDetailComponent } from './Component/Projet/projet-detail/projet-detail.component';
import { AddGestionnaireComponent } from './Component/Projet/add-gestionnaire/add-gestionnaire.component';
import { ProjetListForUserComponent } from './Component/Projet/projet-list-for-user/projet-list-for-user.component';
import { TacheDetailComponent } from './Component/Tache/tache-detail/tache-detail.component';
import { TacheListComponent } from './Component/Tache/tache-list/tache-list.component';
import { DndModule } from 'ngx-drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardssComponent } from './Component/bardtest/boardss/boardss.component';
import { AvatarModule } from 'ngx-avatars';
import { HeaderfrontComponent } from './headerFrontOffice/headerfront/headerfront.component';
import { AddTacheComponent } from './Component/bardtest/add-tache/add-tache.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MomentModule } from 'ngx-moment';
import { DatePipe } from '@angular/common';
import { FullCalendarComponent, FullCalendarModule } from '@fullcalendar/angular';
import { ImputationComponent } from './Component/imputation/imputation.component';
import { MembreProjetComponent } from './Component/MembreProjet/membre-projet.component';
import { AddmembreProjetComponent } from './Component/MembreProjet/addmembre-projet/addmembre-projet.component';
import { NgApexchartsModule } from 'ng-apexcharts';
 
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SamplepageComponent,
    HeaderComponent,
    ListPrioriteComponent,
    FilterPipe,
    PrioriteDetailComponent,
    LoginComponent,
    UploadComponent,    
    UsersComponent,
    UserDetailComponent,
    DashboardV1Component,
    ChangeRoleComponent,
    UpdatePasswordComponent,
    UserProfileComponent,
    StatusListComponent,
    StatusDetailComponent,
    TypeListComponent,
    TypeDetailComponent,
    AddRoleComponent,
    RoleListComponent,
    ProjetListComponent,
    ProjetDetailComponent,
    AddGestionnaireComponent,
    ProjetListForUserComponent,
    TacheListComponent,
    TacheDetailComponent,
   BoardssComponent,
   HeaderfrontComponent,
   AddTacheComponent,
   ImputationComponent,
   MembreProjetComponent,
   AddmembreProjetComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, 
    NgxPaginationModule ,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ToastrModule.forRoot(), 
    DndModule,
    DragDropModule,
    AvatarModule,
    BsDatepickerModule.forRoot(),
    FullCalendarModule ,
    MomentModule,
    NgApexchartsModule

  ],
  providers: [CookieService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
