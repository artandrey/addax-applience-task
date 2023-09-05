import { useQuery } from 'react-query';
import { HolidaysService } from '../services/HolidaysService';
import { Holidays } from '../types/HolidaysApi';

export function useHolidays(countryCode: string, year: number) {
  const { data, isLoading, isLoadingError } = useQuery({
    queryKey: `${countryCode}-${year}`,
    queryFn: async () => {
      const holidays = await HolidaysService.getHolidays(countryCode, year);
      return holidays.reduce<Record<string, Holidays>>(
        (acc, holidays) => ({
          ...acc,
          [holidays.date]: holidays,
        }),
        {}
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { data, isLoading, isLoadingError };
}
