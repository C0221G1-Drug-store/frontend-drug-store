import {AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-manage-chat-room',
  templateUrl: './manage-chat-room.component.html',
  styleUrls: ['./manage-chat-room.component.css']
})
export class ManageChatRoomComponent implements OnInit,AfterViewChecked {
  @ViewChild('scroll') private feedContainer: ElementRef;
  roomname: string;
  constructor() { }

  ngOnInit(): void {
  }

  takeRoomName(roomname: string) {
    this.roomname = roomname;
  }

  scrollBottom() {
    this.feedContainer.nativeElement.scrollTop
      = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked(): void {
    this.scrollBottom();
  }

}
