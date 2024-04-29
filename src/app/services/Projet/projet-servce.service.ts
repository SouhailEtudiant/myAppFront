import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Projet } from '../../models/Projet.models';
import { EnvironmentUrlService } from '../environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProjetServceService {

  cookieValue : string="" ;
  form: FormGroup = new FormGroup({

    id: new FormControl(""),
    projetTitre: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    projetDescription: new FormControl("",[Validators.required]),
    projetImage: new FormControl("",[Validators.required]),
    isActive: new FormControl("",[Validators.required]),
   
    
  });

  projets: Projet[]= [];
  projetsParUser: Projet[]= [];

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
  public getProjet = () => {
    return this.http.get<Projet[]>(this.createCompleteRoute("api/Projet", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: Projet[]) => {this.projets = jou},
      
    });
  }

  public getProjetParIdUser = (id  : string) => {
    return this.http.get<Projet[]>(this.createCompleteRoute("api/MembreProjet/GetProjetParUser?userId="+id, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: Projet[]) => {this.projetsParUser = jou},
      
    });
  }

  public createProjet = (route: string) => {
    return this.http.post<Projet>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public UpdateProjet = (route: string) => {
    return this.http.post<Projet>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }


  public deleteProjet = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }




  public resetForm() {

    this.form.setValue({
      id : 0,
      projetTitre: "",
      projetDescription: "",
      projetImage: "",
      isActive : true ,

    });

  }





  
}
