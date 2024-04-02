import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ParamStatusService } from '../../../services/ParamStatus/param-status.service';
import { ToastrService } from 'ngx-toastr';
import { ParamStatus } from '../../../models/ParamStatus.models';


@Component({
  selector: 'app-status-detail',
  templateUrl: './status-detail.component.html',
  styleUrl: './status-detail.component.css'
})
export class StatusDetailComponent {
  constructor(
    private modalService: BsModalService,
    public   modalRef: BsModalRef,
    public repository: ParamStatusService,
    private toastrService: ToastrService,
   ) { }

   submitted = false;
   clicked=false ;

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
    console.log("insert");
    this.repository.form.controls['isActive'].setValue(true) ; 
    const apiAddress: string = 'api/Status/AddParamStatus';
    this.repository.createStatus(apiAddress)
    .subscribe({
      next: (pr : ParamStatus) => {
        this.toastrService.success("Ajouter","Status Ajouté avec success") ;
        this.repository.getStatus();
        this.modalRef.hide();
        //localStorage.setItem('idjou',pr.id.toString()) ; 
        
      },
      error: (err: HttpErrorResponse) => {
          this.toastrService.error("Error","Erreur lors de linsertion") ;
      }
    })
  }


  UpdateRecord() {
    console.log("update");
    const apiAddress: string = 'api/Status/UpdateParamStatus';
    this.repository.UpdateStatus(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Modification","Status modifié avec success") ;
        this.repository.getStatus();
        this.modalRef.hide();
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
