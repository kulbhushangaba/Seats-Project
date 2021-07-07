import { SeatsModule } from './seats.module';

describe('SeatsModule', () => {
  let seatsModule: SeatsModule;

  beforeEach(() => {
    seatsModule = new SeatsModule();
  });

  it('should create an instance', () => {
    expect(seatsModule).toBeTruthy();
  });
});
