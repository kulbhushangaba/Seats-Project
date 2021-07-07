import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaimageComponent } from './mediaimage.component';

describe('MediaimageComponent', () => {
  let component: MediaimageComponent;
  let fixture: ComponentFixture<MediaimageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaimageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
