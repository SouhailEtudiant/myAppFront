import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ParamPrioriteServiceService } from '../../../services/ParamPriorite/param-priorite-service.service';
import { ParamPriorite } from '../../../models/ParamPriorite.models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-priorite-detail',
  templateUrl: './priorite-detail.component.html',
  styleUrl: './priorite-detail.component.css'
})
export class PrioriteDetailComponent {

  constructor(
    private modalService: BsModalService,
    public   modalRef: BsModalRef,
    public repository: ParamPrioriteServiceService,
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
    const apiAddress: string = 'api/Priorite/AddParamPriorite';
    this.repository.createPriorite(apiAddress)
    .subscribe({
      next: (pr : ParamPriorite) => {
        this.toastrService.success("Ajouter","Priorité Ajouté avec success") ;
        this.repository.getPriorites();
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
    const apiAddress: string = 'api/Priorite/UpdateParamPriorite';
    this.repository.UpdatePriorite(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Modification","Priorité modifié avec success") ;
        this.repository.getPriorites();
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
  
  this.submitted = false;
  this.clicked =false ; 
  this.repository.resetForm();
}

}
