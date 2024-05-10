import { Injectable } from '@angular/core';
import { ImputationDTO } from '../../models/ImputationDTO.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentUrlService } from '../environment-url.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImputationAdd } from '../../models/ImputationAdd.models';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {
  cookieValue : string="" ;
  form: FormGroup = new FormGroup({
    date: new FormControl(""),
    chargeEnHeure: new FormControl(0),
    isActive: new FormControl(""),
    idUtilisateur: new FormControl(""),
    idTache: new FormControl(0),
 
  });


  imp: ImputationDTO[]= [];
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
  public getimp = () => {
    return this.http.get<ImputationDTO[]>(this.createCompleteRoute("api/Imputation/GetImputationByUser", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ImputationDTO[]) => {this.imp = jou},
      
    });
  }

  public createImp = (route: string) => {
    return this.http.post<ImputationAdd>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public deleteImp = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }

}
