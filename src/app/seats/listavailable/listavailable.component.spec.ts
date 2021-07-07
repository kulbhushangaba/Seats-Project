import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListavailableComponent } from './listavailable.component';

describe('ListavailableComponent', () => {
  let component: ListavailableComponent;
  let fixture: ComponentFixture<ListavailableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListavailableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListavailableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
