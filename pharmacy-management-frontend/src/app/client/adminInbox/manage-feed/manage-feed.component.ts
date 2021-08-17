import {AfterViewChecked, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {InboxService} from '../../../service/inbox.service';

@Component({
  selector: 'app-manage-feed',
  templateUrl: './manage-feed.component.html',
  styleUrls: ['./manage-feed.component.css']
})
export class ManageFeedComponent implements OnInit,OnChanges {
  messages:Observable<any[]>
  @Input() roomname:string;
  constructor(
    private auth:InboxService,

  ) { }

  ngOnInit(): void {
    if (this.roomname){
      console.log(this.auth.getMessage(this.roomname));
    }
  }

  ngOnChanges(): void {
    if (this.roomname){
      this.messages=this.auth.getMessage(this.roomname);
    }
  }

}
