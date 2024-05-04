import { Component, ElementRef, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
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
@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrl: './imputation.component.css'
})
export class ImputationComponent implements OnInit {
submitted() {
throw new Error('Method not implemented.');
}
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
  constructor (
    @Inject(LOCALE_ID) public locale: string,public repository: ImputationService,
    private toastrService: ToastrService,
    private  cookieService: CookieService  , private router: Router,
    private http: HttpClient ,  private envUrl: EnvironmentUrlService,  
    public repositoryTache: TacheServicesService ,
    private datePipe: DatePipe,) {}

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
    this.cookieValue = this.cookieService.get('X-Access-Token');
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else { this.getData();}
   
  }

 

  getData (){
    this.http.get<ImputationDTO[]>(this.createCompleteRoute("api/Imputation/GetImputationByUser", this.envUrl.urlAddress), this.generateHeaders())
    .subscribe({
      next: (jou: ImputationDTO[]) => {
        for(let d of jou) {
          this.imp.push({id:d.id ,title: d.title, start: d.start})
          console.log(d) ; 
          console.log(jou) ; 
          console.log(this.imp)
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
 
  eventClick(event : any){
    console.log(event);
    console.log("Clicked");

  }
  
}
