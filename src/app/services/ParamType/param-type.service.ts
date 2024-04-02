import { Injectable } from '@angular/core';
import { ParamType } from '../../models/ParamType.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentUrlService } from '../environment-url.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ParamTypeService {

  cookieValue : string="" ;
  form: FormGroup = new FormGroup({
    id: new FormControl(""),
    libelleType: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    isActive: new FormControl("",[Validators.required]),

    
  });


  types: ParamType[]= [];
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
  public getType = () => {
    return this.http.get<ParamType[]>(this.createCompleteRoute("api/Type", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ParamType[]) => {this.types = jou},
      
    });
  }

  public createType = (route: string) => {
    return this.http.post<ParamType>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public UpdateType = (route: string) => {
    return this.http.post<ParamType>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public ChangeType = (route: string) => {
    return this.http.post<ParamType>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public deleteType = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }




  public resetForm() {

    this.form.setValue({
      id: 0,
      libelleType: "",
      isActive : true ,
    });

  }
  
}
