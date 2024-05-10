import { Injectable } from '@angular/core';
import { ParamPriorite } from '../../models/ParamPriorite.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from '../environment-url.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { CommentaireDTO } from '../../models/CommentaireDTO.models';
import { commentaire } from '../../models/Commentaire.models';

@Injectable({
  providedIn: 'root'
})
export class CommServiceService {

  cookieValue : string="" ;
  form: FormGroup = new FormGroup({
    id: new FormControl(""),
    description: new FormControl("",[Validators.required]),
    date: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    creePar: new FormControl("",[Validators.required]),
    isActive: new FormControl("",[Validators.required]),
    idTache: new FormControl(0,[Validators.required]),
 
    
  });




  commListe: CommentaireDTO[]= [];
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
  public getComms = (id : Number) => {
    return this.http.get<CommentaireDTO[]>(this.createCompleteRoute("api/Commentaire/GetCommentaireByIdTache?id="+id, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: CommentaireDTO[]) => {this.commListe = jou},
      
    });
  }

  public CreateCommentaire = (route: string) => {
    return this.http.post<commentaire>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public deleteComm = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, this.envUrl.urlAddress), this.generateHeaders());
  }


  public resetForm() {

    this.form.setValue({
      id: 0,
      description: "",
      date:"", 
      creePar:"", 
      isActive : true ,
      idTache : 0 ,
       
    });

 

  }
}
