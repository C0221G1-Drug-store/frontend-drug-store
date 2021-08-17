import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMessageComponent } from './manage-message.component';

describe('ManageMessageComponent', () => {
  let component: ManageMessageComponent;
  let fixture: ComponentFixture<ManageMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
