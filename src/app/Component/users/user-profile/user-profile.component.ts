import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EnvironmentUrlService } from '../../../services/environment-url.service';
import { CookieService } from 'ngx-cookie-service';
import { userprofile } from '../../../models/UserProfile.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  detail!: userprofile
  img : string =""
  cookieValue: string="";
  constructor(private http: HttpClient , private envUrl: EnvironmentUrlService, 
    private  cookieService: CookieService,private router: Router) { }
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('X-Access-Token');
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else {  this.getDetails() ;
      this.createImgPath}
  
  }
  

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('X-Access-Token')}`,    })
    }
  }  
  public getDetails = () => {
    return this.http.get<userprofile>(this.createCompleteRoute("api/Authentification/GetUserByUsername?Username="+localStorage.getItem('username'), this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: userprofile) => {this.detail = jou},  
    });
  }


  public createImgPath = (serverPath: string) => { 
    return this.envUrl.urlAddress+`/${localStorage .getItem('img')}`; 
  }

}
