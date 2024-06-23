import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { AddRoleComponent } from '../add-role/add-role.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {
  oriteFilter: any = { libellePriorite: '' };

  constructor (public repository: UserService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalStatus: BsModalService,
    private  cookieService: CookieService  , private router: Router, ) {}
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
    else { this.repository.getRoles();}
  }

  AddRole() {
    this.repository.resetFormAddRole();
    this.modalRef = this.modalActive.show(AddRoleComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    
    }



}
