import {Component, Input, OnInit} from '@angular/core';
import {InboxService} from '../../../service/inbox.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() message:any;
  ownNick:string;
  constructor(
    private auth:InboxService
  ) {}

  ngOnInit(): void {
    this.ownNick=this.auth.getUser().displayName;
  }
}
