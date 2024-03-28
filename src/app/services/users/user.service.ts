import { Injectable } from '@angular/core';
import { getuserwthrole } from '../../models/GetUserDetail.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvironmentUrlService } from '../environment-url.service';
import { CookieService } from 'ngx-cookie-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { registermodel } from '../../models/RegisterModel.model';
import { roles } from '../../models/Roles.model';
import { changeRole } from '../../models/ChangeRole.models';
import { ChangePassword } from '../../models/ChangePass.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  cookieValue : string="" ;
  form: FormGroup = new FormGroup({
    
    username: new FormControl("",[Validators.required, Validators.maxLength(20)]),
    email: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required]),
    nomUser: new FormControl("",[Validators.required]),
    role: new FormControl("",[Validators.required]),
    prenomUser: new FormControl("",[Validators.required]),
    phone: new FormControl("",[Validators.required]),
    imagePath: new FormControl("",[Validators.required]),
    
  });

  formChangeRole: FormGroup = new FormGroup({
    username: new FormControl(""),
    role: new FormControl("",[Validators.required]),
   
  });

  formChangePass: FormGroup = new FormGroup({
    password: new FormControl("",[Validators.required]),
    token: new FormControl(""),
    username: new FormControl(""),
  });


  users: getuserwthrole[]= [];
  roles: roles[]= [];
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
  public getusers = () => {
    return this.http.get<getuserwthrole[]>(this.createCompleteRoute("api/Authentification/GetAllUsers", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: getuserwthrole[]) => {this.users = jou},
      
    });
  }

  public getRoles = () => {
    return this.http.get<roles[]>(this.createCompleteRoute("api/Authentification/GetRoles", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: roles[]) => {this.roles = jou},
      
    });
  }

  public createuser = (route: string) => {
    return this.http.post<registermodel>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.form.value, this.generateHeaders());
  }

  public changeRole = (route: string) => {
    return this.http.post<changeRole>(this.createCompleteRoute(route, this.envUrl.urlAddress),this.formChangeRole.value, this.generateHeaders());
  }

  public changePassword = (route: string) => {
    return this.http.post<ChangePassword>(this.createCompleteRoute(route, this.envUrl.urlAddress), this.formChangePass.value, this.generateHeaders());
  }


  public resetFormPass() {

    this.formChangePass.setValue({
     password:''
    });

  }


  public resetForm() {

    this.form.setValue({
      username: "",
      email: "",
      password: "",
      nomUser: "",
      prenomUser: "",
      phone: "",
      role: "",
      imagePath: "",
     
    });

    

  }
  public resetFormChangeRole() {

    this.formChangeRole.setValue({
      role:''
    });

  }
 

}
