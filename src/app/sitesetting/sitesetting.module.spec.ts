import { SitesettingModule } from './sitesetting.module';

describe('SitesettingModule', () => {
  let sitesettingModule: SitesettingModule;

  beforeEach(() => {
    sitesettingModule = new SitesettingModule();
  });

  it('should create an instance', () => {
    expect(sitesettingModule).toBeTruthy();
  });
});
