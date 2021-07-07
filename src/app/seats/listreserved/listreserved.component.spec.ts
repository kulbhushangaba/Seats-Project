import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListreservedComponent } from './listreserved.component';

describe('ListreservedComponent', () => {
  let component: ListreservedComponent;
  let fixture: ComponentFixture<ListreservedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListreservedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListreservedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
