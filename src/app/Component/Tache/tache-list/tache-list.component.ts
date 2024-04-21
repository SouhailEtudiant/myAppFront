import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { DndDropEvent, DndModule, DropEffect } from 'ngx-drag-drop';
import { TacheServicesService } from '../../../services/Tache/tache-services.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TacheDTO } from '../../../models/TacheDTO.models';


@Component({
  selector: 'app-tache-list',
  templateUrl: './tache-list.component.html',
  styleUrl: './tache-list.component.css'
})
export class TacheListComponent implements OnInit {

  constructor (public repository: TacheServicesService ,
    private  cookieService: CookieService  , private router: Router ) {}

  p: number = 1;
  searchText: string ="";
  clicked=false ;
  cookieValue : string ="" ; 
  ngOnInit(): void {
    this.cookieValue = this.cookieService.get('X-Access-Token');
    if ( this.cookieValue=="")
    {
      this.router.navigate(["/login"]) ; 
    }
    else { this.repository.gettaches();}
   
  }


  onDragged(item: any, list: any[], effect: DropEffect) {

    const index = list.indexOf(item);
    list.splice(index, 1);

    if (item.content === "Block") {
      // simulate long running task
      this.sleep(1000);
    }
    else {
      // run long task in next loop
      setTimeout(() => this.sleep(1000), 0);
    }
  }

  onDrop(event: DndDropEvent, list: any[]) {

    let index = event.index;

    if (typeof index === "undefined") {

      index = list.length;
    }

    list.splice(index, 0, event.data);
  }

  private sleep(millis: number) {

    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while (curDate.getTime() - date.getTime() < millis);
  }
  
}
