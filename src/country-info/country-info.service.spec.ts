import { Test, TestingModule } from '@nestjs/testing';
import { CountryInfoService } from './country-info.service';

describe('CountryInfoService', () => {
  let service: CountryInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryInfoService],
    }).compile();

    service = module.get<CountryInfoService>(CountryInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
