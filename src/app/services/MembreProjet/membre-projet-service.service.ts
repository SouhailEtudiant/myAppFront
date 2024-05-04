import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnvironmentUrlService } from '../environment-url.service';
import { CookieService } from 'ngx-cookie-service';
import { MembreProjet } from '../../models/MembreProjet.models';

@Injectable({
  providedIn: 'root'
})
export class MembreProjetServiceService {

  cookieValue : string="" ;
  form: FormGroup = new FormGroup({

    idMembrePorjet: new FormControl(""),
    idUtilisateur: new FormControl("",[Validators.required]),
    isActive: new FormControl(""),
    idProjet: new FormControl("",[Validators.required]),
   
    
  });


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


  public createMembreProjet = (route: string) => {
    return this.http.post<MembreProjet>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public deleteMembreProjet = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }



}
