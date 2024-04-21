import { Component, OnInit, TemplateRef } from '@angular/core';
import { ProjetServceService } from '../../../services/Projet/projet-servce.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { MembreProjetServiceService } from '../../../services/MembreProjet/membre-projet-service.service';

@Component({
  selector: 'app-projet-list-for-user',
  templateUrl: './projet-list-for-user.component.html',
  styleUrl: './projet-list-for-user.component.css'
})
export class ProjetListForUserComponent implements OnInit {

  constructor (public repository: ProjetServceService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalStatus: BsModalService,
    private  cookieService: CookieService  , private router: Router,
    public repositoryMembre: MembreProjetServiceService ) {}
  modalRef: BsModalRef | undefined;
  moedlrefStatus : BsModalRef | undefined;
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
    else { this.repository.getProjet();}
   
  }

  public createImgPath = (serverPath: string) => { 
    return `http://localhost:15533/${serverPath}`; 
  }
}
