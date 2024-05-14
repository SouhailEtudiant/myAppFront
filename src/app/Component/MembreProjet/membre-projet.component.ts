import { Component, TemplateRef } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { changeRole } from '../../models/ChangeRole.models';
import { getuserwthrole } from '../../models/GetUserDetail.model';
import { ChangePassword } from '../../models/ChangePass.models';
import { MembreProjet } from '../../models/MembreProjet.models';
import { MembreProjetServiceService } from '../../services/MembreProjet/membre-projet-service.service';
import { AddmembreProjetComponent } from './addmembre-projet/addmembre-projet.component';
import { HttpErrorResponse } from '@angular/common/http';
import { EnvironmentUrlService } from '../../services/environment-url.service';

@Component({
  selector: 'app-membre-projet',
  templateUrl: './membre-projet.component.html',
  styleUrl: './membre-projet.component.css'
})
export class MembreProjetComponent {


  userfilter: any = { libellePriorite: '' };

  constructor (public repository: UserService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalDelete: BsModalService ,
    private  cookieService: CookieService  , private router: Router, 
    public repositoryMembre: MembreProjetServiceService,  private envUrl : EnvironmentUrlService ,
    private route: ActivatedRoute,) {

      router.events.forEach((event) => {
        if(event instanceof NavigationEnd) {
          console.log(this.route.snapshot.paramMap.get('id'))
          this.repository.getMembers( Number(this.route.snapshot.paramMap.get('id'))) ;
        }
        
      });

    }
    
  modalRef: BsModalRef | undefined;
  modelRefDelete : BsModalRef | undefined;
  p: number = 1;
  searchText: string ="";
  clicked=false ;
  cookieValue : string ="" ; 
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('X-Access-Token');
    const id = this.route.snapshot.paramMap.get('id');
    let a = Number(id) ;
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else {   this.repository.getMembers(a) ;}
   
  }

  AddGestionnaire() {
    const mem: MembreProjet = {
      idMembrePorjet:0,
      idUtilisateur:"",
      isActive:true,
      idProjet:0,
     
    }

  //this.repositoryMembre.form.controls['idProjet'].setValue(id) ;
    this.repositoryMembre.form.setValue(mem);
    this.modalRef = this.modalActive.show(AddmembreProjetComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    }

    public createImgPath = (serverPath: string) => { 
      return this.envUrl.urlAddress+`/${serverPath}`; 
    }


    deleteMember(userId: string,IdProjet: Number) {

      this.clicked =true ;
      let urlAdress: string = `api/MembreProjet/DeleteMembreProjet?idProjet=`+IdProjet+`&idUser=`+userId;
      this.repositoryMembre.deleteMembreProjet(urlAdress)
      .subscribe({
        
        next: () => {
          this.toastrService.success("Deleted","Membre Supprimé avec success") ;
          this.p=1 ;
          const idproj = this.route.snapshot.paramMap.get('id');
          let ab = Number(idproj) ;
          this.repository.getMembers(ab) ;
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

    ConfirmModal(template: TemplateRef<any>) {
      this.modelRefDelete = this.modalDelete.show(template, { class: 'modal-dialog-centered modal-sm', ignoreBackdropClick: true  });
    }
   
    decline(): void {
      this.modalDelete.hide();
    }
}
