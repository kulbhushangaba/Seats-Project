import { UsermanagememtModule } from './usermanagememt.module';

describe('UsermanagememtModule', () => {
  let usermanagememtModule: UsermanagememtModule;

  beforeEach(() => {
    usermanagememtModule = new UsermanagememtModule();
  });

  it('should create an instance', () => {
    expect(usermanagememtModule).toBeTruthy();
  });
});
