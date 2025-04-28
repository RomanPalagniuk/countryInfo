import { Controller, Get, Post, Body } from '@nestjs/common';
import { CountryInfoService } from './country-info.service';

@Controller('country-info')
export class CountryInfoController {
  constructor(private readonly countryInfoService: CountryInfoService) {}

  @Get('available-countries')
  async getAvailableCountries() {
    return this.countryInfoService.getAvailableCountries();
  }

  @Post('CountryInfo')
  async getCountryInfo(@Body('countryName') countryName: string) {
    return this.countryInfoService.getCountryInfo(countryName);
  }
}