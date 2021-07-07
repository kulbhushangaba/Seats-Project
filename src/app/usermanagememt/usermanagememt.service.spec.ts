import { TestBed, inject } from '@angular/core/testing';

import { UsermanagememtService } from './usermanagememt.service';

describe('UsermanagememtService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsermanagememtService]
    });
  });

  it('should be created', inject([UsermanagememtService], (service: UsermanagememtService) => {
    expect(service).toBeTruthy();
  }));
});
