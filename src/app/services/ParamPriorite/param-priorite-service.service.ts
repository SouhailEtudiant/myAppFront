import { Injectable } from '@angular/core';
import { ParamPriorite } from '../../models/ParamPriorite.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from '../environment-url.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ParamPrioriteServiceService {

  form: FormGroup = new FormGroup({
    id: new FormControl(""),
    libellePriorite: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    isActive: new FormControl("",[Validators.required]),

    
  });


  priorities: ParamPriorite[]= [];
  constructor(private http: HttpClient ,  private envUrl: EnvironmentUrlService) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }

  public getPriorites = () => {
    return this.http.get<ParamPriorite[]>(this.createCompleteRoute("api/Priorite", this.envUrl.urlAddress))
    .subscribe({
      next: (jou: ParamPriorite[]) => {this.priorities = jou},
      
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
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress));
  }




  public resetForm() {

    this.form.setValue({
      id: 0,
      libellePriorite: "",
      isActive : true ,
    });

  }
  
}
