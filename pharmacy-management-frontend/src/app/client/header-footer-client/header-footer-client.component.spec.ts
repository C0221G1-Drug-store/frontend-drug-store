import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderFooterClientComponent } from './header-footer-client.component';

describe('HeaderFooterClientComponent', () => {
  let component: HeaderFooterClientComponent;
  let fixture: ComponentFixture<HeaderFooterClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderFooterClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderFooterClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
