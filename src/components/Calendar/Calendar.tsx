import React, { PropsWithChildren, useMemo } from 'react';
import { CalendarContext } from './CalendarContext';
import { CalendarValue, useDate } from '../../hooks/useDate';
import { getMonthDays } from '../../util/calendar';

interface CalendarProps extends PropsWithChildren {
  defaultValue?: CalendarValue;
}

const Calendar: React.FC<CalendarProps> = ({ defaultValue, children }) => {
  const { date, nextMonth, previousMonth } = useDate(defaultValue);

  const monthDays = useMemo(() => getMonthDays(date.getMonth(), date.getFullYear()), [date]);

  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.toLocaleString('default', { year: 'numeric' });

  return (
    <CalendarContext.Provider
      value={{
        month,
        year,
        monthDays,
        nextMonth,
        previousMonth,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export default Calendar;
