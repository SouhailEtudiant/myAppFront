import { Injectable } from '@angular/core';
import { ImputationDTO } from '../../models/ImputationDTO.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EnvironmentUrlService } from '../environment-url.service';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {
  cookieValue : string="" ;
 

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
}
