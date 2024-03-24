import { Component, OnInit, TemplateRef } from '@angular/core';
import { ParamPrioriteServiceService } from '../../../services/ParamPriorite/param-priorite-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PrioriteDetailComponent } from '../priorite-detail/priorite-detail.component';
import { ParamPriorite } from '../../../models/ParamPriorite.models';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-priorite',
  standalone: false,
  templateUrl: './list-priorite.component.html',
  styleUrl: './list-priorite.component.css'
})
export class ListPrioriteComponent implements OnInit {
  PrioriteFilter: any = { libellePriorite: '' };

  constructor (public repository: ParamPrioriteServiceService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalStatus: BsModalService, ) {}
  modalRef: BsModalRef | undefined;
  moedlrefStatus : BsModalRef | undefined;
  p: number = 1;
  searchText: string ="";
  clicked=false ;
  ngOnInit(): void {
    this.repository.getPriorites();
  }


  AddPriorite() {
    this.repository.resetForm();
    this.modalRef = this.modalActive.show(PrioriteDetailComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    
    }


    updatePriorite(pr: ParamPriorite) {
   
      const priorite: ParamPriorite = {
        id: pr.id,
        libellePriorite: pr.libellePriorite,
        isActive: pr.isActive
        
      }
    //  console.log(joueur.dateEntre.) ;
  
      this.repository.form.setValue(priorite);
      this.modalRef = this.modalActive.show(PrioriteDetailComponent,{
        class:'modal-dialog-centered', ignoreBackdropClick: true 
      });
      }

      ConfirmModal(template: TemplateRef<any>) {
        this.modalRef = this.modalActive.show(template, { class: 'modal-dialog-centered modal-sm', ignoreBackdropClick: true  });
      }
      ModalStatus(template: TemplateRef<any>) {
        this.moedlrefStatus = this.modalStatus.show(template, { class: 'modal-dialog-centered modal-sm', ignoreBackdropClick: true  });
      }
      decline(): void {
        this.modalActive.hide();
      }

      declineStatus(): void {
        this.modalStatus.hide();
      }

      Changerstatus(pr : ParamPriorite) : void {
        this.clicked =true ;
        const priorite: ParamPriorite = {
          id: pr.id,
          libellePriorite: pr.libellePriorite,
          isActive:pr.isActive
          
        }
      //  console.log(joueur.dateEntre.) ;
    
        this.repository.form.setValue(priorite);
        const apiAddress: string = 'api/Priorite/ChangerStatus';
    this.repository.ChangeStatus(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Changement Status","Status modifié avec success") ;
        this.repository.getPriorites();
        this.modalStatus.hide();
        this.clicked =false ;
      },
      error: (err: HttpErrorResponse) => {
         this.toastrService.error("Error","Erreur lors de modification") ;
         this.clicked =false ;
         console.log()
      }
    })
      }

      Delete(id : number)
    {
 
      this.clicked =true ;
  let urlAdress: string = `api/Priorite/DeleteParamPriorite?id=`+id;
  this.repository.deletePriorite(urlAdress)
  .subscribe({
    
    next: () => {
      this.toastrService.success("Deleted","Priorite Supprimé avec success") ;
      this.p=1 ;
      this.repository.getPriorites();
      this.modalActive.hide();
      this.clicked =false ;
    },
    error: (err: HttpErrorResponse) => {
       this.toastrService.error("Error",err.message) ;
       this.modalActive.hide();
       this.clicked =false ;
       console.log()
    }
  })
  }

}
