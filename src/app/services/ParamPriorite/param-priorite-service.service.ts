import { Injectable } from '@angular/core';
import { ParamPriorite } from '../../models/ParamPriorite.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from '../environment-url.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ParamPrioriteServiceService {
  cookieValue : string="" ;
  form: FormGroup = new FormGroup({
    id: new FormControl(""),
    libellePriorite: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    isActive: new FormControl("",[Validators.required]),

    
  });


  priorities: ParamPriorite[]= [];
  prioritiesActive: ParamPriorite[]= [];
  constructor(private http: HttpClient ,  private envUrl: EnvironmentUrlService, 
    private  cookieService: CookieService
  ) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('X-Access-Token')}`,    })
    }
  }  
  public getPriorites = () => {
    return this.http.get<ParamPriorite[]>(this.createCompleteRoute("api/Priorite", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ParamPriorite[]) => {this.priorities = jou},
      
    });
  }

  public getPrioritesActive = () => {
    return this.http.get<ParamPriorite[]>(this.createCompleteRoute("api/Priorite/ActivePriorite", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ParamPriorite[]) => {this.prioritiesActive = jou},
      
    });
  }

  public createPriorite = (route: string) => {
    return this.http.post<ParamPriorite>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public UpdatePriorite = (route: string) => {
    return this.http.post<ParamPriorite>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public ChangeStatus = (route: string) => {
    return this.http.post<ParamPriorite>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public deletePriorite = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }




  public resetForm() {

    this.form.setValue({
      id: 0,
      libellePriorite: "",
      isActive : true ,
    });

  }
  
}
