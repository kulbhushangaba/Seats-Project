import { TestBed, inject } from '@angular/core/testing';

import { SharemanagementService } from './sharemanagement.service';

describe('SharemanagementService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharemanagementService]
    });
  });

  it('should be created', inject([SharemanagementService], (service: SharemanagementService) => {
    expect(service).toBeTruthy();
  }));
});
