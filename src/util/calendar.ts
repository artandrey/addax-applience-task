import range from './range';

export const DAYS_IN_WEEK = 7;
export const ROWS_COUNT = 5;

export class MonthDay {
  public readonly isCurrentMonth: boolean;
  constructor(private readonly date: Date, private readonly selectedMonth: number) {
    this.isCurrentMonth = this.date.getMonth() === this.selectedMonth;
  }

  getFormatted(): string {
    return this.date.getDate().toString();
  }

  getFullDate(): string {
    return this.formatDate(this.date);
  }

  private formatDate(date: Date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
}

export enum StartDay {
  SUNDAY = 1,
  MONDAY = 2,
}

export function getMonthDays(month: number, year: number, startDay: StartDay = StartDay.MONDAY): MonthDay[] {
  const firstDayOfTheMonth = new Date(year, month, 1).getDay();
  const currentMonthCount = startDay - firstDayOfTheMonth;
  const daysArray: MonthDay[] = [...range(currentMonthCount, DAYS_IN_WEEK * ROWS_COUNT - firstDayOfTheMonth + startDay)].map(
    (currentDay) => new MonthDay(new Date(year, month, currentDay), month)
  );
  return daysArray;
}
