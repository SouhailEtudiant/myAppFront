import { Component, OnInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ParamStatusService } from '../../../services/ParamStatus/param-status.service';
import { StatusDetailComponent } from '../status-detail/status-detail.component';
import { ParamStatus } from '../../../models/ParamStatus.models';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrl: './status-list.component.css'
})
export class StatusListComponent implements OnInit {

  constructor (public repository: ParamStatusService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalStatus: BsModalService,
    private  cookieService: CookieService  , private router: Router, ) {}
  modalRef: BsModalRef | undefined;
  moedlrefStatus : BsModalRef | undefined;
  p: number = 1;
  searchText: string ="";
  clicked=false ;
  cookieValue : string ="" ; 
     role : string | null  =""
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('X-Access-Token');
    this.role= localStorage.getItem('role')  ; 
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }else if (this.role != "Adminstrateur"){this.router.navigate(["/accessDenied"]) }
    else { this.repository.getStatus();}
   
  }

  AddPriorite() {
    this.repository.resetForm();
    this.modalRef = this.modalActive.show(StatusDetailComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    
    }


    updatePriorite(pr: ParamStatus) {
   
      const priorite: ParamStatus = {
        id: pr.id,
        libelleStatus: pr.libelleStatus,
        isActive: pr.isActive
        
      }
    //  console.log(joueur.dateEntre.) ;
  
      this.repository.form.setValue(priorite);
      this.modalRef = this.modalActive.show(StatusDetailComponent,{
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

      Changerstatus(pr : ParamStatus) : void {
        this.clicked =true ;
        const priorite: ParamStatus = {
          id: pr.id,
          libelleStatus: pr.libelleStatus,
          isActive:pr.isActive
          
        }
      //  console.log(joueur.dateEntre.) ;
    
        this.repository.form.setValue(priorite);
        const apiAddress: string = 'api/Status/ChangerStatus';
    this.repository.ChangeStatus(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Changement Status","Status modifié avec success") ;
        this.repository.getStatus();
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
  let urlAdress: string = `api/Status/DeleteParamStatus?id=`+id;
  this.repository.deleteStatus(urlAdress)
  .subscribe({
    
    next: () => {
      this.toastrService.success("Deleted","Status Supprimé avec success") ;
      this.p=1 ;
      this.repository.getStatus();
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
