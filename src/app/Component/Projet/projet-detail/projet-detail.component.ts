import { Component, OnInit } from '@angular/core';
import { InitialNavigation } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ParamTypeService } from '../../../services/ParamType/param-type.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';
import { ProjetServceService } from '../../../services/Projet/projet-servce.service';
import { Projet } from '../../../models/Projet.models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-projet-detail',
  templateUrl: './projet-detail.component.html',
  styleUrl: './projet-detail.component.css'
})
export class ProjetDetailComponent   {

  constructor(
    private modalService: BsModalService,
    public   modalRef: BsModalRef,
    public repository: ProjetServceService,
    private toastrService: ToastrService,
   ) { }

   submitted = false;
   clicked=false ;
   response!: { dbPath: ''; };
   get f(): { [key: string]: AbstractControl } {
    return this.repository.form.controls;
  }


  onSubmit() {  
    this.submitted = true;
this.clicked =true ; 
    if (this.repository.form.invalid) {
      this.clicked =false ;
      return;
    }
    else
    {
      if (this.repository.form.controls['id'].value==0)
      {
        this.insertRecord();
      
    }
        
      else
      this.UpdateRecord();
  
    }
    

  }


  insertRecord() {
    
    this.repository.form.controls['isActive'].setValue(true) ; 
    const apiAddress: string = 'api/Projet/AddProjet';
    this.repository.createProjet(apiAddress)
    .subscribe({
      next: (pr : Projet) => {
        this.toastrService.success("Ajouter","Projet Ajouté avec success") ;
        this.repository.getProjet();
        this.modalRef.hide();
        //this.repository.resetForm() ;
        //localStorage.setItem('idjou',pr.id.toString()) ; 
        
      },
      error: (err: HttpErrorResponse) => {
          this.toastrService.error("Error","Erreur lors de linsertion") ;
      }
    })
  }

  uploadFinished = (event: { dbPath: ""; }) => { 
    this.response = event; 
    this.repository.form.controls['projetImage'].setValue(this.response.dbPath)  ;
  }

  UpdateRecord() {
    console.log("update");
    const apiAddress: string = 'api/Projet/UpdateProjet';
    this.repository.UpdateProjet(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Modification","Projet modifié avec success") ;
        this.repository.getProjet();
        this.modalRef.hide();
        //this.repository.resetForm() ;
      },
      error: (err: HttpErrorResponse) => {
         this.toastrService.error("Error","Erreur lors de modification") ;
         console.log()
      }
    })
  }



  public  clear ()
{
  this.submitted=false; 
  this.repository.resetForm();
}
}
