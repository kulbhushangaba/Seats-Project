import { SharemanagementModule } from './sharemanagement.module';

describe('SharemanagementModule', () => {
  let sharemanagementModule: SharemanagementModule;

  beforeEach(() => {
    sharemanagementModule = new SharemanagementModule();
  });

  it('should create an instance', () => {
    expect(sharemanagementModule).toBeTruthy();
  });
});
