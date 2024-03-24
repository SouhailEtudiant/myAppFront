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
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SamplepageComponent,
    HeaderComponent,
    ListPrioriteComponent,
    FilterPipe,
    PrioriteDetailComponent
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
