import { Component, Input, OnInit, input } from '@angular/core';
import { TacheServicesService } from '../../../services/Tache/tache-services.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../services/users/user.service';
import { ParamPrioriteServiceService } from '../../../services/ParamPriorite/param-priorite-service.service';
import { ParamStatusService } from '../../../services/ParamStatus/param-status.service';
import { ParamTypeService } from '../../../services/ParamType/param-type.service';
import { ProjetServceService } from '../../../services/Projet/projet-servce.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl } from '@angular/forms';
import { Tache } from '../../../models/Tache.models';
import { HttpErrorResponse } from '@angular/common/http';
import moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-tache',
  templateUrl: './add-tache.component.html',
  styleUrl: './add-tache.component.css'
})

export class AddTacheComponent implements OnInit {

  constructor (public repository: TacheServicesService,
     private modalService: BsModalService,
    public   modalRef: BsModalRef,
    private  cookieService: CookieService  ,
    public repositoryUser: UserService,
    public repositoryPriorite: ParamPrioriteServiceService,
    public repositoryStatus: ParamStatusService,
    public repositoryType: ParamTypeService,
    public repositoryProjet: ProjetServceService,
    private router: Router, 
     private toastrService: ToastrService,
     private datePipe: DatePipe,
     private route: ActivatedRoute ) {}
    cookieValue : string ="" ; 
    datDebut : Date | undefined;
    datFin : Date | undefined;

  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('X-Access-Token');
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else { 
      
      this.repositoryPriorite.getPriorites();
      this.repositoryStatus.getStatus() ;
      this.repositoryType.getType(); 
      this.repositoryUser.getusers() ;
      this.repositoryProjet.getProjet();
    }
   
  }
  submitted = false;
  clicked=false ;
 


  get f(): { [key: string]: AbstractControl } {
   return this.repository.form.controls;
 }


 onSubmit() {  
  //this.repository.form.controls['idProjet'].setValue(this.id) ;

  
  this.submitted = true;
this.clicked =true ; 
  if (this.repository.form.invalid) {
    this.clicked =false ;
    return;
  }
  else {
    
      this.insertRecord();
    
  }
}
  

insertRecord() {
console.log(this.repository.form.controls['dateDebut'].value)
  this.repository.form.controls['isActive'].setValue(true) ; 
  this.repository.form.controls['dateDebut'].setValue(this.datePipe.transform(this.repository.form.controls['dateDebut'].value, 'yyyy-MM-dd')) ;
  this.repository.form.controls['dateFin'].setValue(this.datePipe.transform(this.repository.form.controls['dateFin'].value, 'yyyy-MM-dd')) ;

 const apiAddress: string = 'api/Tache/AddTache';
 console.log(apiAddress) ; 
 this.repository.createTache(apiAddress)
 .subscribe({
   next: (pr : Tache) => {
     this.toastrService.success("Ajouter","Tache ajouter avec succée") ;
     this.repository.getTacheBoardParProjet(Number(this.route.snapshot.paramMap.get('id')));
     this.modalRef.hide();
     
   },
   error: (err: HttpErrorResponse) => {
       this.toastrService.error("Error",err.message) ;
   this.clicked=false ; 
   }
 })
}
public  clear ()
{
  this.submitted=false; 
  this.repository.resetForm();
}

}
