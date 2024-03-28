import { Component } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { ChangePassword } from '../../../models/ChangePass.models';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {


  constructor(public repository: UserService,
     
    private toastrService: ToastrService,
    private modalService: BsModalService,
    public   modalRef: BsModalRef,private formBuilder: FormBuilder,
    private  cookieService: CookieService 
 
   ) { }

   clicked=false ;
   submitted = false;
   //date : Date= new Date()
   dat : Date | undefined;
  ngOnInit(): void {
 
   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.repository.formChangePass.controls;
  }

  public  clear ()
{
  this.submitted=false; 
  this.repository.resetFormPass();
}
  onSubmit() {
    this.submitted = true;
    this.clicked=true ;
    if (this.repository.formChangePass.invalid) {
      this.clicked=false ;

      return;
    }
    else
    {
     
     this.UpdateRecord();
  
    }
    

  }
  UpdateRecord() {
    const apiAddress: string = 'api/Authentification/ChangePassword';
    this.repository.changePassword(apiAddress)
    .subscribe({
      next: (tt : ChangePassword) => {
        console.log(tt)
        this.toastrService.success("Modification","Mot De Passe  modifié avec success") ;
        this.modalRef.hide();
        this.clicked=false ;

      },
      error: (err: HttpErrorResponse) => {
        if(err.status==400)
            {
              this.toastrService.error("Le Mot de passe Doit comporter au moins : 1 Lettre Majuscule , 1 Lettre Minuscule , 1 Chiffre , un symbol et de langueur minimal 6 ") ;
              this.clicked=false ;
            }
            
        this.clicked=false ;

       // this.modalRef.hide();
        // console.log()
      }
    })
  }


}
