import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxBoxComponent } from './inbox-box.component';

describe('InboxBoxComponent', () => {
  let component: InboxBoxComponent;
  let fixture: ComponentFixture<InboxBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InboxBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
