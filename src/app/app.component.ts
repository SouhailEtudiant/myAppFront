import { Component } from '@angular/core';
import { LoginServicesService } from './Component/login/login-services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myAppFront';
  constructor( public authservice : LoginServicesService){}
}
