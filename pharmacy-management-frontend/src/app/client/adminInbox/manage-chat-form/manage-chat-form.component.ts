import {Component, Input, OnInit} from '@angular/core';
import {InboxService} from '../../../service/inbox.service';

@Component({
  selector: 'app-manage-chat-form',
  templateUrl: './manage-chat-form.component.html',
  styleUrls: ['./manage-chat-form.component.css']
})
export class ManageChatFormComponent implements OnInit {
  msg: string;
  @Input() roomname:string;
  constructor(
    private auth:InboxService
  ) { }

  ngOnInit(): void {
  }

  sendMessage(){
    this.auth.sendMessageByAdmin(this.msg,this.roomname);
    this.msg='';
  }

  handleKeyDow(event) {
    if (event.keyCode===13){
      console.log("abc");
      console.log(this.msg);
      this.sendMessage();
    }
  }
}
