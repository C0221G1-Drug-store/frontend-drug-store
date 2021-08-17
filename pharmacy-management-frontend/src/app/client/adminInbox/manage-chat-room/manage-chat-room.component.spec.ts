import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChatRoomComponent } from './manage-chat-room.component';

describe('ManageChatRoomComponent', () => {
  let component: ManageChatRoomComponent;
  let fixture: ComponentFixture<ManageChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
