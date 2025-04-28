import { Module } from '@nestjs/common';
import { CountryInfoController } from './country-info.controller';
import { CountryInfoService } from './country-info.service';

@Module({
  controllers: [CountryInfoController],
  providers: [CountryInfoService]
})
export class CountryInfoModule {}