import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../Component/login/login-services.service';
import { ProjetServceService } from '../services/Projet/projet-servce.service';
import { EnvironmentUrlService } from '../services/environment-url.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent  implements OnInit {

  name : string | null  =""
  prenom : string  | null  =""
  role : string | null  =""
  img : string =""
  id : string  | null  ="" ;
  constructor(public authservice: LoginServicesService, public repositoryProject : ProjetServceService,  private envUrl : EnvironmentUrlService ,){}
  ngOnInit(): void {
    this.name= localStorage.getItem('nom')  ; 
    this.prenom= localStorage.getItem('prenom')  ; 
    this.role= localStorage.getItem('role')  ; 
    this.id = localStorage.getItem('id') ;
    if (this. id === null)
      {}
    else {this.repositoryProject.getProjetParIdUser(this.id); 
    }

  }

  public createImgPath = (serverPath: string) => { 
    return this.envUrl.urlAddress+`/${localStorage .getItem('img')}`; 
  }

  addtolocalstorage(id : Number) {
    localStorage.setItem("idprojMembre",id.toString())
    }
  
}
