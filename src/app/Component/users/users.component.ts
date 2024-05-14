import { Component } from '@angular/core';
import { UserService } from '../../services/users/user.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ChangeRoleComponent } from './change-role/change-role.component';
import { changeRole } from '../../models/ChangeRole.models';
import { getuserwthrole } from '../../models/GetUserDetail.model';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { ChangePassword } from '../../models/ChangePass.models';
import { EnvironmentUrlService } from '../../services/environment-url.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  userfilter: any = { libellePriorite: '' };

  constructor (public repository: UserService,private modalActive: BsModalService,
    private toastrService: ToastrService,private modalStatus: BsModalService,
    private  cookieService: CookieService  , private router: Router, private envUrl : EnvironmentUrlService , ) {}
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
    else { this.repository.getusers();}
   
  }

  addUser() {
     
    this.modalRef = this.modalActive.show(UserDetailComponent,{
      class:'modal-dialog-centered', ignoreBackdropClick: true 
    });
    
    }

    public createImgPath = (serverPath: string) => { 
      return this.envUrl.urlAddress+`/${serverPath}`; 
    }

    ChangeRole(usr : getuserwthrole)
    {
      const userr: changeRole = {
         
        username: usr.username,
        role:usr.role,
        
        
      }
    //  console.log(joueur.dateEntre.) ;
  
      this.repository.formChangeRole.setValue(userr);
      this.modalRef = this.modalActive.show(ChangeRoleComponent,{
        class:'modal-dialog-centered', ignoreBackdropClick: true 
      });
    }

    updateuser(us: getuserwthrole) {
   
      const userr: ChangePassword = {
   
        username: us.username,
        token:this.cookieService.get('X-Access-Token'),
        password:"",
        
      }
   
  
      this.repository.formChangePass.setValue(userr);
      this.modalRef = this.modalActive.show(UpdatePasswordComponent,{
        class:'modal-dialog-centered', ignoreBackdropClick: true 
      });
  
      }

}
