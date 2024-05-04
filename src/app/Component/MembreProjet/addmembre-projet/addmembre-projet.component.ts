import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { CookieService } from 'ngx-cookie-service';
import { MembreProjetServiceService } from '../../../services/MembreProjet/membre-projet-service.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { MembreProjet } from '../../../models/MembreProjet.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addmembre-projet',
  templateUrl: './addmembre-projet.component.html',
  styleUrl: './addmembre-projet.component.css'
})
export class AddmembreProjetComponent implements OnInit {

  idProj : Number = 0 ;
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
    else { 
      this.idProj= Number(localStorage.getItem('idprojMembre'))  ;
      this.repository.GetUsersMembers(this.idProj);}
   
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
  this.idProj= Number(localStorage.getItem('idprojMembre'))  ; 
 this.repositoryMembre.form.controls['idProjet'].setValue(this.idProj) ; 
 const apiAddress: string = 'api/MembreProjet/AddMembreProjet';
 console.log(apiAddress) ; 
 this.repositoryMembre.createMembreProjet(apiAddress)
 .subscribe({
   next: (pr : MembreProjet) => {
     this.toastrService.success("Ajouter","Utilisateur Affecté avec success") ;
    this.repository.getMembers(this.idProj);
     this.modalRef.hide();
    
     
   },
   error: (err: HttpErrorResponse) => {
       this.toastrService.error("Error",err.error) ;
   this.clicked=false ; 
   }
 })
}

}
