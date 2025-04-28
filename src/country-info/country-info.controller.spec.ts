import { Test, TestingModule } from '@nestjs/testing';
import { CountryInfoController } from './country-info.controller';

describe('CountryInfoController', () => {
  let controller: CountryInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountryInfoController],
    }).compile();

    controller = module.get<CountryInfoController>(CountryInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
