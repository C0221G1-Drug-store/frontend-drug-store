import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-manage-message',
  templateUrl: './manage-message.component.html',
  styleUrls: ['./manage-message.component.css']
})
export class ManageMessageComponent implements OnInit {
  @Input() message:any;
  constructor() { }

  ngOnInit(): void {
  }

}
