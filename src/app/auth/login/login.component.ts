import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {AuthService} from '../auth.service';
import { DialogServiceService } from '../../services/dialog-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(private authService: AuthService,
    public dialogServiceService: DialogServiceService,
     private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login(this.email, this.password)
    .subscribe(data => {
      console.log(data.user.error);
      if(!data.user.error)
      {
        this.router.navigate(['dashboard']);
      }
      else{
        this.dialogServiceService.showDiloag("Email or password is incorrect");
      }
      
    })
  }
  
  add(){
    this.router.navigate(['/addseat']);
  }

  listavailable(){
    this.router.navigate(['/listavailable']);
  }

  listreserved(){
    this.router.navigate(['/listreserved']);
  }

  listsold(){
    this.router.navigate(['/listsold']);
  }
}
