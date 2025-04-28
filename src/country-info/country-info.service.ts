import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

export interface AvailableCountry {
  countryCode: string;
  name: string;
}

interface BorderCountryInfo {
  borders: string[];
  code: string;
  name: string;
}

interface PopulationData {
  country: string;
  populationCounts: {
    year: string;
    value: number;
  }[];
}

interface FlagData {
  country: string;
  flag: string;
}

interface IsoData {
  name: string;
  Iso2: string;
  Iso3: string;
}

@Injectable()
export class CountryInfoService {
  async getAvailableCountries(): Promise<AvailableCountry[]> {
    const response: AxiosResponse<AvailableCountry[]> = await axios.get(
      `${process.env.AVAILABLE_COUNTRIES_URL}`,
    );

    return response.data;
  }

  private async getIso2CodeByCountryName(countryName: string): Promise<string> {
    try {
      const response: AxiosResponse<{ data: IsoData }> = await axios.post(
        `${process.env.ISO_URL}`,
        { country: countryName },
      );

      return response.data.data.Iso2;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCountryInfo(countryName: string) {
    const countryCode = await this.getIso2CodeByCountryName(countryName);
    console.log(countryCode);
    const [bordersResponseRaw, populationResponseRaw, flagResponseRaw] = await Promise.all([
        axios.get(`${process.env.COUNTRY_INFO_URL}/${countryCode}`),
        axios.post(`${process.env.POPULATION_URL}`, { country: countryName }),
        axios.post(`${process.env.FLAG_URL}`, { iso2: countryCode }),
      ]);

    const bordersResponse = bordersResponseRaw as AxiosResponse<BorderCountryInfo>;
    const populationResponse = populationResponseRaw as AxiosResponse<{
      data: PopulationData;
    }>;
    const flagResponse = flagResponseRaw as AxiosResponse<{ data: FlagData }>;

    return {
      borders: bordersResponse.data.borders,
      populationData: populationResponse.data.data.populationCounts,
      flagUrl: flagResponse.data.data.flag,
    };
  }
}
