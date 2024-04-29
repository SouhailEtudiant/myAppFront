import { Injectable } from '@angular/core';
import { EnvironmentUrlService } from '../environment-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { TacheDTO } from '../../models/TacheDTO.models';
import { TacheListForBoard } from '../../models/TacheListForBoard.models';
import { Tache } from '../../models/Tache.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TacheServicesService {

  cookieValue : string="" ;

  form: FormGroup = new FormGroup({

    id: new FormControl(""),
    tacheTitre: new FormControl("",[Validators.required, Validators.maxLength(120)]),
    tacheDescription: new FormControl("",[Validators.required]),
    chargeEstime: new FormControl(0,[Validators.required]),
    chargeReele: new FormControl(0,[Validators.required]),
    dateDebut: new FormControl("",[Validators.required]),
    dateFin: new FormControl("",[Validators.required]),
    isActive: new FormControl("",[Validators.required]),
    idUtilisateur: new FormControl("",[Validators.required]),
    idPriorite: new FormControl("",[Validators.required]),
    idStatus: new FormControl("",[Validators.required]),
    idType: new FormControl("",[Validators.required]),
    idProjet: new FormControl("",[Validators.required]),
    
   
    
  });


  formUpdateStatus: FormGroup = new FormGroup({
    tacheId: new FormControl(0),
    idStatus: new FormControl(0)
  });

  formSousTache: FormGroup = new FormGroup({

    id: new FormControl(""),
    tacheTitre: new FormControl("",[Validators.required, Validators.maxLength(120)]),
    tacheDescription: new FormControl("",[Validators.required]),
    chargeEstime: new FormControl(0,[Validators.required]),
    chargeReele: new FormControl(0,[Validators.required]),
    dateDebut: new FormControl("",[Validators.required]),
    dateFin: new FormControl("",[Validators.required]),
    isActive: new FormControl("",[Validators.required]),
    idUtilisateur: new FormControl("",[Validators.required]),
    idPriorite: new FormControl("",[Validators.required]),
    idStatus: new FormControl("",[Validators.required]),
    idType: new FormControl("",[Validators.required]),
    idProjet: new FormControl("",[Validators.required]),
    idTacheParent: new FormControl(0,[Validators.required]),
    
   
    
  });

  tache: TacheDTO[]= [];
  tachebyID: TacheDTO[]= [];
  SousTacheList: TacheDTO[]= [];
  tacheBoard: TacheListForBoard[]= [];
  tacheBoardProject: TacheListForBoard[]= [];
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
  public gettaches = () => {
    return this.http.get<TacheDTO[]>(this.createCompleteRoute("api/Tache", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: TacheDTO[]) => {this.tache = jou},
      
    });
  }

  public getTacheBoard = () => {
    return this.http.get<TacheListForBoard[]>(this.createCompleteRoute("api/Tache/GetListOfLists", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: TacheListForBoard[]) => {this.tacheBoard = jou},
      
    });
  }
  public getTacheByID = (id : Number) => {
    return this.http.get<TacheDTO[]>(this.createCompleteRoute("api/Tache/GetID?id="+id, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: TacheDTO[]) => {this.tachebyID = jou},
      
    });
  }

  public getSousTache = (id : Number) => {
    return this.http.get<TacheDTO[]>(this.createCompleteRoute("api/Tache/GetSousTache?idparent="+id, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: TacheDTO[]) => {this.SousTacheList = jou},
      
    });
  }

  public getTacheBoardParProjet = (idprojet : number) => {
    return this.http.get<TacheListForBoard[]>(this.createCompleteRoute("api/Tache/GetListOfListsParProjet?projectID="+idprojet, this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: TacheListForBoard[]) => {this.tacheBoardProject = jou},
      
    });
  }
  
  public createTache = (route: string) => {
    return this.http.post<Tache>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public createSousTache = (route: string) => {
    return this.http.post<Tache>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.formSousTache.value, this.generateHeaders());
  }

  public updateTacheById = (route: string) => {
    return this.http.post<Tache>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.formUpdateStatus.value, this.generateHeaders());
  }


  public updateTache = (route: string) => {
    return this.http.post<Tache>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public resetForm() {

    this.form.setValue({
      id: 0,
      tacheTitre: "",
      tacheDescription:"", 
      chargeEstime:0, 
      chargeReele: 0, 
      dateDebut:"", 
      dateFin:"", 
      idUtilisateur:"", 
      idPriorite:"", 
      idStatus:"", 
      idType:"", 
      idProjet:"", 
      isActive : true ,
       
    });
  }

  public resetFormSousTache() {

    this.formSousTache.setValue({
      id: 0,
      tacheTitre: "",
      tacheDescription:"", 
      chargeEstime:0, 
      chargeReele: 0, 
      dateDebut:"", 
      dateFin:"", 
      idUtilisateur:"", 
      idPriorite:"", 
      idStatus:"", 
      idType:"", 
      idProjet:"", 
      isActive : true ,
      idTacheParent : 0 ,
       
    });
  }


}
