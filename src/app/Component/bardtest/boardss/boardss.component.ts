import { Component, Inject, OnInit, TemplateRef } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { DOCUMENT, DatePipe } from '@angular/common';
import { TacheServicesService } from '../../../services/Tache/tache-services.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTacheComponent } from '../add-tache/add-tache.component';
import { Tache } from '../../../models/Tache.models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/users/user.service';
import { ParamPrioriteServiceService } from '../../../services/ParamPriorite/param-priorite-service.service';
import { ParamStatusService } from '../../../services/ParamStatus/param-status.service';
import { ParamTypeService } from '../../../services/ParamType/param-type.service';
import { ProjetServceService } from '../../../services/Projet/projet-servce.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { CommServiceService } from '../../../services/Commentaire/comm-service.service';
import { commentaire } from '../../../models/Commentaire.models';
import { EnvironmentUrlService } from '../../../services/environment-url.service';
import moment from 'moment';

@Component({
  selector: 'app-boardss',
  templateUrl: './boardss.component.html',
  styleUrl: './boardss.component.css'
})
export class BoardssComponent implements OnInit {

 
  public sidebarShow: boolean = false;
  ok : boolean =true ;
  taskId : Number =0  ;
  leftMoves: number = 0;
  rightMoves: number = 0;
  customStyle = {
   cursor: "pointer",
    
 };
 myDate = new Date();
 role : string | null  =""
 selected_user = ''; 
   
 
 constructor(@Inject(DOCUMENT) private document: Document,
 public repository: TacheServicesService ,
 private  cookieService: CookieService  , private router: Router,
 private modalActive: BsModalService,
 private modalDelete: BsModalService,
 private modalLoader: BsModalService,
 private route: ActivatedRoute,
    public repositoryUser: UserService,
    public repositoryPriorite: ParamPrioriteServiceService,
    public repositoryStatus: ParamStatusService,
    public repositoryType: ParamTypeService,
    public repositoryProjet: ProjetServceService,
     private toastrService: ToastrService,
     private datePipe: DatePipe,
     public   modalRef: BsModalRef,
     public repositoryComm : CommServiceService,
     private modalActiveSousTache: BsModalService,
     public modalRefSousTache: BsModalRef,
     private modalActiveUpdateStatus: BsModalService,
     public modalRefUpdateStatus: BsModalRef,
     public modelRefDelete: BsModalRef,
     public modelRefLoader: BsModalRef,
     private envUrl : EnvironmentUrlService ,
   

) {


  //this.currDate=this.datePipe.transform(this.currDate, 'yyyy-MM-dd');
  router.events.forEach((event) => {
    if(event instanceof NavigationEnd) {
      console.log(this.route.snapshot.paramMap.get('id'))
      this.repository.getTacheBoardParProjet( Number(this.route.snapshot.paramMap.get('id')),"") ;
    
    }
    
  });
}
  cookieValue : string ="" ; 
  ngOnInit(): void {
    this.ok=true ;
    this.cookieValue = this.cookieService.get('X-Access-Token');
    const id = this.route.snapshot.paramMap.get('id');
    let a = Number(id) ;
    this.role= localStorage.getItem('role')  ; 
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else if (this.role == "Adminstrateur"){this.router.navigate(["/accessDenied"]) }
    else { 
       
        this.repository.getTacheBoardParProjet(a,"") ; this.repositoryUser.getusers()
       
    }
  
  }

  openPopupDelete (template: TemplateRef<any>){
    this.modelRefDelete = this.modalDelete.show(template, { class: 'modal-dialog-centered modal-sm', ignoreBackdropClick: true  });
  }

  Delete(id : Number , idTache : Number) {
    this.clicked =true ;
      let urlAdress: string = `api/Commentaire/DeleteCommentaire?id=`+id
      this.repositoryComm.deleteComm(urlAdress)
      .subscribe({
        
        next: () => {
          this.toastrService.success("Deleted","Commentaire Supprimé avec success") ;
          this.repositoryComm.getComms(idTache);
          this.modalDelete.hide();
        //  this.reset()
          this.clicked =false ;
        },
        error: (err: HttpErrorResponse) => {
           this.toastrService.error("Error",err.message) ;
           this.clicked =false ;
        }
      })
    }
    decline() {
      this.modalDelete.hide()
    }
    
    ConfirmModal(template: TemplateRef<any> , id : Number) {
      this.submitted = false;

      this.repository.resetForm(); 
      this.repositoryPriorite.getPrioritesActive();
      this.repositoryStatus.getStatusActive() ;
      this.repositoryType.getTypeActive(); 
      this.repositoryUser.getusers() ;
      this.repositoryProjet.getProjet();
      this.repository.form.controls['idStatus'].setValue(id) ; 
      this.repository.form.controls['id'].setValue(0) ;
      this.repository.form.controls['isActive'].setValue(true) ; 

      this.repository.form.controls['idProjet'].setValue(Number(this.route.snapshot.paramMap.get('id'))) ;
      this.modalRef = this.modalActive.show(template, { class: 'modal-lg', ignoreBackdropClick: true  });
    }

    submitted = false;
    clicked=false ;
   
  
  
    get f(): { [key: string]: AbstractControl } {
     return this.repository.form.controls;
   }
  
  
   onSubmit() {  
    this.submitted = true;
  this.clicked =true ; 
  console.log(this.repository.form.value)
    if (this.repository.form.invalid) {
      this.clicked =false ;
      return;
    }
    else {
      
        this.insertRecord();
      
    }
  }
    
  
  insertRecord() {
    this.repository.form.controls['dateDebut'].setValue(this.datePipe.transform(this.repository.form.controls['dateDebut'].value, 'yyyy-MM-dd')) ;
    this.repository.form.controls['dateFin'].setValue(this.datePipe.transform(this.repository.form.controls['dateFin'].value, 'yyyy-MM-dd')) ;
  
   const apiAddress: string = 'api/Tache/AddTache';
   console.log(apiAddress) ; 
   this.repository.createTache(apiAddress)
   .subscribe({
     next: (pr : Tache) => {
       this.toastrService.success("Ajouter","Tache ajouter avec succée") ;
       this.repository.getTacheBoardParProjet(Number(this.route.snapshot.paramMap.get('id')),"");
       this.modalRef.hide();
       this.clicked=false ; 
       this.submitted = false;
     },
     error: (err: HttpErrorResponse) => {
         this.toastrService.error("Error",err.message) ;
     this.clicked=false ; 
     this.submitted = false;
     }
   })
  }
  public  clear ()
  {
    this.submitted=false; 
    this.repository.resetForm();
  }

  getData (id : Number) {
    this.repository.getTacheByID(id); 
    this.repositoryComm.getComms(id); 
    this.repository.getSousTache(id) ; 
  }

  public createImgPath = (serverPath: string) => { 
    return this.envUrl.urlAddress+`/${serverPath}`; 
  }

  get fComm(): { [key: string]: AbstractControl } {
    return this.repositoryComm.form.controls;
  }

  onSubmitComm(id : Number) {  
    this.submitted = true;
  this.clicked =true ; 
  this.repositoryComm.form.controls['id'].setValue(0);
  this.repositoryComm.form.controls['date'].setValue(this.datePipe.transform(this.myDate, 'yyyy-MM-dd')) ;
  this.repositoryComm.form.controls['creePar'].setValue(localStorage.getItem('id')); 
  this.repositoryComm.form.controls['isActive'].setValue(true); 
  this.repositoryComm.form.controls['idTache'].setValue(id); 
    if (this.repositoryComm.form.invalid) {
      this.clicked =false ;
      return;
    }
    else {
      
      const apiAddress: string = 'api/Commentaire/AddCommentaire';
      console.log(apiAddress) ; 
      this.repositoryComm.CreateCommentaire(apiAddress)
      .subscribe({
        next: (pr : commentaire) => {
          this.toastrService.success("Ajouter","Commentaire ajouter avec succée") ;
          this.repositoryComm.getComms(id); 
          this.clicked=false ; 
          this.submitted = false;
          this.repositoryComm.resetForm()
          
        },
        error: (err: HttpErrorResponse) => {
            this.toastrService.error("Error",err.message) ;
        this.clicked=false ; 
        this.submitted = false;
        }
      })
      
    }
  }
  ConfirmModalSousTache(template: TemplateRef<any> , id : Number , idStatus :Number) {
    this.repositoryPriorite.getPrioritesActive();
    this.repositoryStatus.getStatusActive() ;
    this.repositoryType.getTypeActive(); 
    this.repositoryUser.getusers() ;
    this.repositoryProjet.getProjet();
    this.submitted = false;
    this.repository.resetFormSousTache(); 
    
 
    this.repository.formSousTache.controls['idStatus'].setValue(idStatus) ; 
    //this.repository.formSousTache.controls['id'].setValue(0) ;
    this.repository.formSousTache.controls['isActive'].setValue(true) ; 
    this.repository.formSousTache.controls['idTacheParent'].setValue(id) ; 
    this.repository.formSousTache.controls['idProjet'].setValue(Number(this.route.snapshot.paramMap.get('id'))) ;
    this.modalRefSousTache = this.modalActiveSousTache.show(template, { class: 'modal-lg', ignoreBackdropClick: true  });
  }




  get fSousTache(): { [key: string]: AbstractControl } {
   return this.repository.formSousTache.controls;
 }


 onSubmitSousTache() {  
  this.submitted = true;
this.clicked =true ; 
console.log(this.repository.formSousTache.value)
  if (this.repository.formSousTache.invalid) {
    this.clicked =false ;
    return;
  }
  else {
    
      this.insertRecordSousTache();
    
  }
}

onChange(value: any) { 
  console.log(value.target.value);
  this.selected_user = value.target.value; 
  this.repository.getTacheBoardParProjet( Number(this.route.snapshot.paramMap.get('id')),this.selected_user) ;

} 

openPopupUpdateStatus (id : Number,status : Number,template: TemplateRef<any>){
  this.repository.formUpdateStatus.controls['tacheId'].setValue(id) ; 
  this.repository.formUpdateStatus.controls['idStatus'].setValue(status) ; 
  this.repositoryStatus.getStatus();
  this.modalRefUpdateStatus = this.modalActiveUpdateStatus.show(template, { class: 'modal-dialog-centered', ignoreBackdropClick: true  });
 }

onSubmitUpdateStatus(){
 if(this.repository.formUpdateStatus.controls['idStatus'].value==0  ) 
  {this.toastrService.error("Erreur","Vous devez choisir un status") ;}
 else {
  const apiAddress: string = 'api/Tache/UpdateTachebyId';
  console.log(apiAddress) ; 
  this.repository.createSousTache(apiAddress)
    this.repository.updateTacheById(apiAddress)
    .subscribe({
      next: (pr : Tache) => {
        this.toastrService.success("","Status Changé avec succées") ;
        this.modalRefUpdateStatus.hide();
        this.repository.getTacheByID(this.repository.formUpdateStatus.controls['tacheId'].value); 
        this.repository.getTacheBoardParProjet(this.repository.tachebyID[0].idProjet,"");
       // this.repositoryComm.getComms(id); 
        //this.repository.getSousTache(this.taskId) ; 
      },
      error: (err: HttpErrorResponse) => {
          this.toastrService.error("Error",err.message) ;
      }
    })


 }



}
  

insertRecordSousTache() {
  this.repository.formSousTache.controls['dateDebut'].setValue(this.datePipe.transform(this.repository.formSousTache.controls['dateDebut'].value, 'yyyy-MM-dd')) ;
  this.repository.formSousTache.controls['dateFin'].setValue(this.datePipe.transform(this.repository.formSousTache.controls['dateFin'].value, 'yyyy-MM-dd')) ;

 const apiAddress: string = 'api/Tache/AddTache';
 console.log(apiAddress) ; 
 this.repository.createSousTache(apiAddress)
 .subscribe({
   next: (pr : Tache) => {
     this.toastrService.success("Ajouter","Sous Tache ajouter avec succée") ;
     this.modalRefSousTache.hide();
     this.clicked=false ; 
     this.submitted = false;
   },
   error: (err: HttpErrorResponse) => {
       this.toastrService.error("Error",err.message) ;
   this.clicked=false ; 
   this.submitted = false;
   }
 })
}
public  clearSousTache ()
{
  this.submitted=false; 
  this.repository.resetFormSousTache();
}


public loader (template: TemplateRef<any>)
{
this.modelRefLoader = this.modalLoader.show(template, { class: 'modal-dialog-centered modal-sm', ignoreBackdropClick: true  });
}






  

}



 
