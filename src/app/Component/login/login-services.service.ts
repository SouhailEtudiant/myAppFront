import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EnvironmentUrlService } from '../../services/environment-url.service';
import { Router } from '@angular/router';
import { response } from '../../models/ResponseLogin.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {
  form: FormGroup = new FormGroup({
   
    username: new FormControl("",[Validators.required ]),
    password: new FormControl("",[Validators.required ]),
    
    
  });

hasRole : boolean = true ;  
  constructor(private http: HttpClient ,
    private  cookieService: CookieService ,  private envUrl: EnvironmentUrlService,private formBuilder: FormBuilder,  private router: Router) { }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }  

  public login = (route: string) => {
    return this.http.post<response>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public resetForm() {

    this.form.setValue({
     
      username: "",
      password:"", 
      
    
    });

  }
  loggedIn() {
    return !!this.cookieService.get('X-Access-Token')
  }

  logout()
  {
    localStorage.removeItem('nom') ; 
    localStorage.removeItem('prenom') ; 
    localStorage.removeItem('role') ; 
    localStorage.removeItem('img') ; 
    localStorage.removeItem('id') ; 
    this.cookieService.delete('X-Access-Token', '/');
    this.router.navigate(["/login"]) ;
  }
}
