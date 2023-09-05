import React from 'react';
import { MonthDay } from '../../util/calendar';

export const CalendarContext = React.createContext<CalendarControls | null>(null);

export interface CalendarControls {
  monthDays: MonthDay[];
  nextMonth(): void;
  previousMonth(): void;
  year: string;
  month: string;
}
