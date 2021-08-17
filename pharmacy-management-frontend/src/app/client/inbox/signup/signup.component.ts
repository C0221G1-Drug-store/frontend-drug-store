import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import firebase from 'firebase';
import AuthSettings = firebase.auth.AuthSettings;
import {InboxService} from '../../../service/inbox.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() control:EventEmitter<any>=new EventEmitter<any>();

  constructor(
    private auth:InboxService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }

  googleLogin(){
    this.auth.googleLogin().then(()=>{
      this.control.emit(true)
    })
  }

  facebookLogin(){
    this.auth.facebookLogin().then(()=>{
      this.control.emit(true);
    })
  }
}
