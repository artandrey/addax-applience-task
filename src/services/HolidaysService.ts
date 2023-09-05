import axios from 'axios';

const nagerDateApiClient = axios.create({
  baseURL: 'https://date.nager.at/api/v3/',
});

export class HolidaysService {
  static async getHolidays(countryCode: string, year?: number) {
    const result = await nagerDateApiClient.get(
      '/PublicHolidays/' + year ?? new Date().getFullYear() + '/' + countryCode
    );
    return result.data;
  }
}
