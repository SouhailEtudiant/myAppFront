import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ImputationService } from '../../services/Imputation/imputation.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ImputationDTO } from '../../models/ImputationDTO.models';
import { EnvironmentUrlService } from '../../services/environment-url.service';
@Component({
  selector: 'app-imputation',
  templateUrl: './imputation.component.html',
  styleUrl: './imputation.component.css'
})
export class ImputationComponent implements OnInit {
  imp: ImputationDTO[]= [];
  cookieValue : string ="" ; 
  calendarOptions : CalendarOptions | undefined ;
  constructor (public repository: ImputationService,
    private toastrService: ToastrService,
    private  cookieService: CookieService  , private router: Router,
    private http: HttpClient ,  private envUrl: EnvironmentUrlService,  ) {}

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
      editable: true,
      selectable: true,
     // height: 550,
      locale: 'fr',
      
  stickyFooterScrollbar : true,
      droppable: true,// will let it receive events!,
      eventDrop: function(info) {
        console.log("OKAYY");
        console.log(info.event.id);
        console.log(info.event.start);
        console.log(info.event.end);
       
      
      //  this.appointmentService.updateInstallBoardAppointments(info);
      },
      dateClick:function (info) {
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

 
 
  eventClick(event : any){
    console.log(event);
    console.log("Clicked");

  }
  
}
