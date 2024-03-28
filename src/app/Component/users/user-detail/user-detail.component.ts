import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import { registermodel } from '../../../models/RegisterModel.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {

  constructor(
    private modalService: BsModalService,
    public   modalRef: BsModalRef,
    public repository: UserService,
    private toastrService: ToastrService,
   ) { }
  ngOnInit() {
    this.repository.getRoles() ;
  }

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
    else {
    
        this.insertRecord();
      
    }
  }
    
    insertRecord() {
     
       
      const apiAddress: string = 'api/Authentification/register?Role='+this.repository.form.controls['role'].value;
      this.repository.form.controls['imagePath'].setValue(this.response.dbPath)  ;
      
        this.repository.createuser(apiAddress)
        .subscribe({
          next: (pr : registermodel) => {
            this.toastrService.success("Ajouter","Utilisateur Ajouté avec success") ;
            this.repository.getusers();
            this.modalRef.hide();
            //localStorage.setItem('idjou',pr.id.toString()) ; 
            
          },
          error: (err: HttpErrorResponse) => {
            console.log('dfzzff')
            this.clicked=false ; 
            if(err.status==400)
            {
              this.toastrService.error("Le Mot de passe Doit comporter au moins : 1 Lettre Majuscule , 1 Lettre Minuscule , 1 Chiffre , un symbol et de langueur minimal 6 ") ;
            }
            else   {this.toastrService.error(err.error.message)}
              
              console.log ("aaaa", err)
          }
        })
     
     
   

    }
     

    uploadFinished = (event: { dbPath: ""; }) => { 
      this.response = event; 
      this.repository.form.controls['imagePath'].setValue(this.response.dbPath)  ;
    }
    clear () {
      this.repository.resetForm();
    }
    
  }




