import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugNotSelectedComponent } from './drug-not-selected.component';

describe('DrugNotSelectedComponent', () => {
  let component: DrugNotSelectedComponent;
  let fixture: ComponentFixture<DrugNotSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrugNotSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugNotSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
