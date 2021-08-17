import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {InboxService} from '../../../service/inbox.service';

@Component({
  selector: 'app-inbox-box',
  templateUrl: './inbox-box.component.html',
  styleUrls: ['./inbox-box.component.css']
})
export class InboxBoxComponent implements OnInit {
  flat:boolean =false;
  contractFlat:boolean=false;
  @Output() closeFlat:EventEmitter<any>=new EventEmitter<any>();
  constructor(
    private auth:InboxService
  ) { }

  ngOnInit(): void {
  }

  takeControl(control:boolean) {
    this.flat=control;
  }

  closeBox() {
    this.closeFlat.emit(false);
  }

  logOut(){
    this.auth.logout();
    this.flat=false;
    this.closeContract();
  }

  closeContract() {
    if (this.contractFlat){
      this.contractFlat=false;
    }else {
      this.contractFlat=true;
    }
  }
}
