import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginServicesService } from './login-services.service';
import { response } from '../../models/ResponseLogin.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  constructor(public repository: LoginServicesService,    private toastrService: ToastrService,  private router: Router,
    private  cookieService: CookieService ) { }

myDate: Date = new Date();

  submitted = false;
  clicked=false ;
  ngOnInit(): void {}

  onSubmit() {
    this.submitted = true;
    this.clicked =true ;
    if (this.repository.form.invalid) {
      this.clicked =false ; 
      return;
    }
    else
    {
      this.login(); 
    }

  }



  login() {
    const apiAddress: string = 'api/Authentification/login';
   
   
    this.repository.login(apiAddress)
    .subscribe({
      
      next: (res : response) => {
        this.myDate.setHours( this.myDate.getHours() + 1 );
        this.cookieService.set('X-Access-Token', res.token.toString(),{ expires: this.myDate });
        //localStorage.setItem('res', JSON.stringify(res));
       
         localStorage.setItem('nom', res.nom);
         localStorage.setItem('prenom', res.prenom);
         localStorage.setItem('role', res.role);
         localStorage.setItem('img', res.img);
         localStorage.setItem('username', res.username);
         localStorage.setItem('id', res.id);
         if(localStorage.getItem('role')=="Adminstrateur")
        this.router.navigate(["/dashboard"]) ;
      else  this.router.navigate(["/dashboardUser"]) ;
        this.clicked =false ;
      //  localStorage.setItem('token', res.token);
      //  localStorage.setItem('username',  res.username);
      //  localStorage.setItem('role', res.role);
      },
      error: (err: HttpErrorResponse) => {
         this.toastrService.error("Erreur","Vérifier Login Ou Mot De Passe") ;
         this.clicked =false ;
      }
    }) //"Hs@16071998 //shajri2
    
  }

  clear (){this.repository.resetForm()}

  get f(): { [key: string]: AbstractControl } {
    return this.repository.form.controls;
  }

}
