import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProjetServceService } from '../../../services/Projet/projet-servce.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { ProjetDetailComponent } from '../projet-detail/projet-detail.component';
import { Projet } from '../../../models/Projet.models';
import { HttpErrorResponse } from '@angular/common/http';
import { MembreProjet } from '../../../models/MembreProjet.models';
import { MembreProjetServiceService } from '../../../services/MembreProjet/membre-projet-service.service';
import { AddGestionnaireComponent } from '../add-gestionnaire/add-gestionnaire.component';
import { EnvironmentUrlService } from '../../../services/environment-url.service';

@Component({
  selector: 'app-projet-list',
  templateUrl: './projet-list.component.html',
  styleUrl: './projet-list.component.css'
})
export class ProjetListComponent implements OnInit {

  constructor (public repository: ProjetServceService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalStatus: BsModalService,
    private  cookieService: CookieService  , private router: Router,
    public repositoryMembre: MembreProjetServiceService, private envUrl : EnvironmentUrlService ) {}
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
    }
    else if (this.role != "Adminstrateur"){this.router.navigate(["/accessDenied"]) }
 
    else { this.repository.getProjet();}
   
  }

  public createImgPath = (serverPath: string) => { 
    return this.envUrl.urlAddress+`/${serverPath}`; 
  }

  AddProjet() {
    this.repository.resetForm();
    this.modalRef = this.modalActive.show(ProjetDetailComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    
    }


    AddGestionnaire(id: number) {
      const mem: MembreProjet = {
        idMembrePorjet:0,
        idUtilisateur:"",
        isActive:true,
        idProjet:id,
       
      }

    //this.repositoryMembre.form.controls['idProjet'].setValue(id) ;
      this.repositoryMembre.form.setValue(mem);
      this.modalRef = this.modalActive.show(AddGestionnaireComponent,{
        class:'modal-dialog-centered', ignoreBackdropClick: true 
      });
      }

    updatePriorite(pr: Projet) {
   
      const priorite: Projet = {
        id: pr.id,
        projetTitre: pr.projetTitre,
        isActive: pr.isActive,
        projetDescription: pr.projetDescription,
        projetImage: pr.projetImage
      }
    //  console.log(joueur.dateEntre.) ;
  
      this.repository.form.setValue(priorite);
      this.modalRef = this.modalActive.show(ProjetDetailComponent,{
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

      Changerstatus(pr : Projet) : void {
        this.clicked =true ;
        const priorite: Projet = {
          id: pr.id,
        projetTitre: pr.projetTitre,
        isActive:! pr.isActive,
        projetDescription: pr.projetDescription,
        projetImage: pr.projetImage
          
        }
      //  console.log(joueur.dateEntre.) ;
    
        this.repository.form.setValue(priorite);
        const apiAddress: string = 'api/Projet/UpdateProjet';
    this.repository.UpdateProjet(apiAddress)
    .subscribe({
      next: () => {
        this.toastrService.success("Changement Status","Status modifié avec success") ;
        this.repository.getProjet();
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
  let urlAdress: string = `api/Projet/DeleteProjet?id=`+id;
  this.repository.deleteProjet(urlAdress)
  .subscribe({
    
    next: () => {
      this.toastrService.success("Deleted","Projet Supprimé avec success") ;
      this.p=1 ;
      this.repository.getProjet();
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
