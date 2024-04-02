import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ParamStatus } from '../../models/ParamStatus.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentUrlService } from '../environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ParamStatusService {

  cookieValue : string="" ;
  form: FormGroup = new FormGroup({
    id: new FormControl(""),
    libelleStatus: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    isActive: new FormControl("",[Validators.required]),

    
  });


  status: ParamStatus[]= [];
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
  public getStatus = () => {
    return this.http.get<ParamStatus[]>(this.createCompleteRoute("api/Status", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ParamStatus[]) => {this.status = jou},
      
    });
  }

  public createStatus = (route: string) => {
    return this.http.post<ParamStatus>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public UpdateStatus = (route: string) => {
    return this.http.post<ParamStatus>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public ChangeStatus = (route: string) => {
    return this.http.post<ParamStatus>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public deleteStatus = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }




  public resetForm() {

    this.form.setValue({
      id: 0,
      libelleStatus: "",
      isActive : true ,
    });

  }
  
}
