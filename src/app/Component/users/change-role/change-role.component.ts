import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-change-role',
  templateUrl: './change-role.component.html',
  styleUrl: './change-role.component.css'
})
export class ChangeRoleComponent    implements OnInit {

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
    return this.repository.formChangeRole.controls;
  }


  onSubmit() {
    this.clicked=true ;
    this.submitted = true;

    if (this.repository.formChangeRole.invalid) {
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
  this.repository.resetFormChangeRole();
}
  UpdateRecord() {
    const apiAddress: string = 'api/Authentification/ChangeRole';
    this.repository.changeRole(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Modification","Role  modifié avec success") ;
         this.repository.getusers();
        this.modalRef.hide();
        this.clicked=false ;
      },
      error: (err: HttpErrorResponse) => {
        this.toastrService.success("Modification","Role  modifié avec success") ;
       this.repository.getusers();
        this.modalRef.hide();
        this.clicked=false ;
        
      }
    })
  }



}
