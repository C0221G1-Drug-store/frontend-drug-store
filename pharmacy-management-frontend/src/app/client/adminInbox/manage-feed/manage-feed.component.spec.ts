import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFeedComponent } from './manage-feed.component';

describe('ManageFeedComponent', () => {
  let component: ManageFeedComponent;
  let fixture: ComponentFixture<ManageFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
