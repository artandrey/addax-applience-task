import axios from 'axios';
import { Holidays } from '../types/HolidaysApi';

const nagerDateApiClient = axios.create({
  baseURL: 'https://date.nager.at/api/v3/',
});

export class HolidaysService {
  static async getHolidays(countryCode: string, year?: number) {
    const result = await nagerDateApiClient.get<Holidays[]>(`/PublicHolidays/${year ?? new Date().getFullYear()}/${countryCode}`);
    return result.data;
  }
}
