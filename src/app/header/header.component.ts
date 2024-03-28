import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../Component/login/login-services.service';

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
  constructor(public authservice: LoginServicesService,){}
  ngOnInit(): void {
    this.name= localStorage.getItem('nom')  ; 
    this.prenom= localStorage.getItem('prenom')  ; 
    this.role= localStorage.getItem('role')  ; 
     

  }

  public createImgPath = (serverPath: string) => { 
    return `http://localhost:15533/${localStorage .getItem('img')}`; 
  }
  
}
