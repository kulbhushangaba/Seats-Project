import { TestBed, inject } from '@angular/core/testing';

import { SitesettingService } from './sitesetting.service';

describe('SitesettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SitesettingService]
    });
  });

  it('should be created', inject([SitesettingService], (service: SitesettingService) => {
    expect(service).toBeTruthy();
  }));
});
