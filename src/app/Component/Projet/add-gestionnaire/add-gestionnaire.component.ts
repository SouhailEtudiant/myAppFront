import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractControl } from '@angular/forms';
import { MembreProjet } from '../../../models/MembreProjet.models';
import { MembreProjetServiceService } from '../../../services/MembreProjet/membre-projet-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-gestionnaire',
  templateUrl: './add-gestionnaire.component.html',
  styleUrl: './add-gestionnaire.component.css'
})
export class AddGestionnaireComponent  implements OnInit{

  constructor (public repository: UserService, private modalService: BsModalService,
    public   modalRef: BsModalRef,
    private  cookieService: CookieService  ,
     private router: Router,public repositoryMembre: MembreProjetServiceService,
     private toastrService: ToastrService, ) {}
    cookieValue : string ="" ; 
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('X-Access-Token');
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else { this.repository.getGestionnaire();}
   
  }
  submitted = false;
  clicked=false ;
 


  get f(): { [key: string]: AbstractControl } {
   return this.repositoryMembre.form.controls;
 }



  onSubmit() {  
   this.submitted = true;
this.clicked =true ; 
   if (this.repositoryMembre.form.invalid) {
     this.clicked =false ;
     return;
   }
   else {
   
       this.insertRecord();
     
   }
 }
   

 insertRecord() {
 
 // this.repositoryMembre.form.controls['isActive'].setValue(true) ; 
  const apiAddress: string = 'api/MembreProjet/AddMembreProjet';
  console.log(apiAddress) ; 
  this.repositoryMembre.createMembreProjet(apiAddress)
  .subscribe({
    next: (pr : MembreProjet) => {
      this.toastrService.success("Ajouter","Gestionnaire Affecté avec success") ;
     // this.repository.getType();
      this.modalRef.hide();
      
    },
    error: (err: HttpErrorResponse) => {
        this.toastrService.error("Error",err.error) ;
    this.clicked=false ; 
    }
  })
}
    
}
