import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageChatFormComponent } from './manage-chat-form.component';

describe('ManageChatFormComponent', () => {
  let component: ManageChatFormComponent;
  let fixture: ComponentFixture<ManageChatFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageChatFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageChatFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
