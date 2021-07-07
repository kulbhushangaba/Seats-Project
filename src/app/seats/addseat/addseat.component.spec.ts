import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddseatComponent } from './addseat.component';

describe('AddseatComponent', () => {
  let component: AddseatComponent;
  let fixture: ComponentFixture<AddseatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddseatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddseatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
