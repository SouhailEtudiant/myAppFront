import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AbstractControl } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ParamType } from '../../../models/ParamType.models';
import { ParamTypeService } from '../../../services/ParamType/param-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-type-detail',
  templateUrl: './type-detail.component.html',
  styleUrl: './type-detail.component.css'
})
export class TypeDetailComponent {
  constructor(
    private modalService: BsModalService,
    public   modalRef: BsModalRef,
    public repository: ParamTypeService,
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
    const apiAddress: string = 'api/Type/AddParamType';
    this.repository.createType(apiAddress)
    .subscribe({
      next: (pr : ParamType) => {
        this.toastrService.success("Ajouter","Type Ajouté avec success") ;
        this.repository.getType();
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
    const apiAddress: string = 'api/Type/UpdateParamType';
    this.repository.UpdateType(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Modification","Type modifié avec success") ;
        this.repository.getType();
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
