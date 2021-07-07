import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsoldComponent } from './listsold.component';

describe('ListsoldComponent', () => {
  let component: ListsoldComponent;
  let fixture: ComponentFixture<ListsoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
