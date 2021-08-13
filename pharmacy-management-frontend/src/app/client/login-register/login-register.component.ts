import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  flag  = false;
  constructor() { }

  ngOnInit(): void {
  }
  openRegister(){
    if(this.flag){
      this.flag = false;
    }else {
      this.flag = true;
    }
  }


}
