import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AddRole } from '../../../models/AddRole.models';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {

  constructor(public repository: UserService,
     
    private toastrService: ToastrService,
    private modalService: BsModalService,
    public   modalRef: BsModalRef,private formBuilder: FormBuilder,
 
   ) { }

   clicked=false ;
   submitted = false;
   dat : Date | undefined;
  ngOnInit(): void {
 
   this.repository.getRoles() ;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.repository.formAddRole.controls;
  }


  onSubmit() {
    this.clicked=true ;
    this.submitted = true;

    if (this.repository.formAddRole.invalid) {
      this.clicked=false ;
      return;
    }
    else
    {
     
     this.UpdateRecord();
  
    }
    
    
  }
  public  clear ()
{
  this.submitted=false; 
  this.repository.resetFormAddRole();
}
  UpdateRecord() {
    let urlAdress: string = `api/Authentification/AddRole?role=`+this.repository.formAddRole.controls['role'].value

    this.repository.createRole(urlAdress)
    .subscribe({
      next: (ad : AddRole) => {
        this.toastrService.success("Ajout","Role Ajouter avec success") ;
         this.repository.getRoles();
        this.modalRef.hide();
        this.clicked=false ;
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.error("Modification","Role Exist") ;
        //this.modalRef.hide();
        this.clicked=false ;
        
      }
    })
  }

}
