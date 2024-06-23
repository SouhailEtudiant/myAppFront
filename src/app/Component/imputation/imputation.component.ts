import { Component, ElementRef, Inject, LOCALE_ID, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ImputationService } from '../../services/Imputation/imputation.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ImputationDTO } from '../../models/ImputationDTO.models';
import { EnvironmentUrlService } from '../../services/environment-url.service';
import { DATE } from 'ngx-bootstrap/chronos/units/constants';
import { TacheServicesService } from '../../services/Tache/tache-services.service';
import { ImputationAdd } from '../../models/ImputationAdd.models';
import { DatePipe, formatDate } from '@angular/common';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrl: './imputation.component.css'
})
export class ImputationComponent implements OnInit {


  @ViewChild('nameInput')
  nameInput!: ElementRef;
  @ViewChild('nombreHeure')
  nombreHeure!: ElementRef;
  imp: ImputationDTO[]= [];
  clicked : boolean = false ; 
  cookieValue : string ="" ; 
  calendarOptions : CalendarOptions | undefined ;
selecteddate: any;
idUtilisateur="";
datess! : Date;
datessString="";
role : string | null  =""
  constructor (
    @Inject(LOCALE_ID) public locale: string,public repository: ImputationService,
    private toastrService: ToastrService,
    private  cookieService: CookieService  , private router: Router,
    private http: HttpClient ,  private envUrl: EnvironmentUrlService,  
    public repositoryTache: TacheServicesService ,
    private datePipe: DatePipe,
    private modalDelete: BsModalService ,) {}
    modelRefDelete : BsModalRef | undefined;
    private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
    }
    private generateHeaders = () => {
      return {
        headers: new HttpHeaders({ 'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.cookieService.get('X-Access-Token')}`,    })
      }
    }  
  
    
  ngOnInit()
   {
    this.role= localStorage.getItem('role')  ; 
    this.cookieValue = this.cookieService.get('X-Access-Token');
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    } else if (this.role == "Adminstrateur"){this.router.navigate(["/accessDenied"]) }
    else { this.getData();}
   
  }




  ConfirmModal(template: TemplateRef<any>) {
    this.modelRefDelete = this.modalDelete.show(template, { class: 'modal-dialog-centered modal-sm', ignoreBackdropClick: true  });
  }
 
  decline(): void {
    this.modalDelete.hide();
  }

  
 

  getData (){
    this.imp= [] ;
    this.http.get<ImputationDTO[]>(this.createCompleteRoute("api/Imputation/GetImputationByUser?UserId="+localStorage.getItem('id') , this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ImputationDTO[]) => {
       
        for(let d of jou) {
          this.imp.push({id:d.id ,title: d.title, start: d.start ,prioriteId:d.prioriteId,
            borderColor:d.borderColor })
        }
      },
      
    }); 

    this.calendarOptions = {
      plugins: [dayGridPlugin,interactionPlugin],
      initialView: 'dayGridMonth',
      initialDate: new Date(),
      weekends: true,
     // editable: true,
      selectable: true,
     // height: 550,
      locale: 'fr',
      
  stickyFooterScrollbar : true,
     // droppable: true,// will let it receive events!,
     eventClick: function(info) {
      localStorage.setItem("idImpToDelete",info.event.id) ;
console.log(info.event.id);
console.log(info.event.title);
document.getElementById("showpopUp")?.click();
      // change the border color just for fun
      info.el.style.borderColor = 'red';
    },

      eventDrop: function(info) {
        console.log("OKAYY");
        console.log(info.event.id);
        console.log(info.event.start);
        console.log(info.event.end);
       
      
      //  this.appointmentService.updateInstallBoardAppointments(info);
      },
      dateClick:function (info) {
        const output = document.getElementById('offcanvasRightLabel');
      if (output) output.innerHTML =info.dateStr ;
      console.log(document.getElementById('offcanvasRightLabel')?.innerHTML) ;
        document.getElementById("show")?.click();
        console.log("See day infos: ",info);
    },
      headerToolbar: {
        left: '',
        center: 'title',
        
      },
      events: this.imp, 
    };
  


  }

 reset(){
  this.nameInput.nativeElement.value="" ;
  this.nombreHeure.nativeElement.value =""
  this.repositoryTache.getTacheByID(0) ;
 }

  searchTask() {
    this.repositoryTache.getTacheByID(this.nameInput.nativeElement.value ) ;
     this.clicked=true ; 
    }

    addImputation(id : Number){
      this.clicked=false ;
      if (this.nombreHeure.nativeElement.value =="" || this.nombreHeure.nativeElement.value==0)
     {
      this.toastrService.error("Veiller remplir votre temps")
     }
     else {
      const iduser =localStorage.getItem('id') ;
      if (iduser) this.idUtilisateur=iduser.toString(); 
      const output = document.getElementById('offcanvasRightLabel');
      if(output)  this.datessString=output.innerHTML.toString() ;
      
      this.repository.form.controls['date'].setValue(this.datePipe.transform(this.datessString, 'yyyy-MM-dd')) ;
      this.repository.form.controls['chargeEnHeure'].setValue(this.nombreHeure.nativeElement.value) ;
      this.repository.form.controls['idTache'].setValue(id) ;
      this.repository.form.controls['idUtilisateur'].setValue(this.idUtilisateur) ;
      this.repository.form.controls['isActive'].setValue(true) ;

   
          const apiAddress: string = 'api/Imputation/AddImputation';
          this.repository.createImp(apiAddress)
          .subscribe({
            next: (pr : ImputationAdd) => {
              this.toastrService.success("Ajouter","Imputation Ajouté avec success") ;
             this.getData(); 
              document.getElementById("show")?.click();
              this.reset()
        
              
            },
            error: (err: HttpErrorResponse) => {
                this.toastrService.error("Error","Erreur lors de linsertion") ;
                this.getData(); 
                document.getElementById("show")?.click();
                this.reset()
            }
          })
     }
    } 

    Delete() {
      this.clicked =true ;
      //localStorage.getItem("idImpToDelete") ;
      let idToDelete = Number(localStorage.getItem("idImpToDelete"))
      let urlAdress: string = `api/Imputation/DeleteImputation?id=`+idToDelete
      this.repository.deleteImp(urlAdress)
      .subscribe({
        
        next: () => {
          this.toastrService.success("Deleted","Imputation Supprimé avec success") ;
          this.getData();
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
 
  eventClick(event : any){
    console.log(event);
    console.log("Clicked");

  }
  
}
