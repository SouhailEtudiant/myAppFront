import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SamplepageComponent } from './samplepage/samplepage.component';
import { ListPrioriteComponent } from './Component/ParamPriorite/list-priorite/list-priorite.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path : '' , title : 'Dashboard Page' , component:DashboardComponent} ,
  {path : 'samplepage' , title : 'Sample Page' , component:SamplepageComponent} ,
  {path : 'priorite' , title : 'Priorite Page' , component:ListPrioriteComponent} ,
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
