import { Component, Inject, OnInit } from '@angular/core';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { DOCUMENT } from '@angular/common';
import { TacheServicesService } from '../../../services/Tache/tache-services.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AddTacheComponent } from '../add-tache/add-tache.component';
@Component({
  selector: 'app-boardss',
  templateUrl: './boardss.component.html',
  styleUrl: './boardss.component.css'
})
export class BoardssComponent implements OnInit {
  leftMoves: number = 0;
  rightMoves: number = 0;
  customStyle = {
   cursor: "pointer",
    
 };
   
  constructor(@Inject(DOCUMENT) private document: Document,
  public repository: TacheServicesService ,
  private  cookieService: CookieService  , private router: Router,
  private modalActive: BsModalService,
 ) 
 
 {
  }
  modalRef: BsModalRef | undefined;
  ngOnInit(): void {
   this.repository.getTacheBoard ()  ;
  
  }

  AddTache() {
    this.repository.resetForm();
    this.modalRef = this.modalActive.show(AddTacheComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    
    }

}



 
