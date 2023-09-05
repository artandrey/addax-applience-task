import { useState } from 'react';

export interface CalendarValue {
  year: number;
  month: number;
}

function getCalendarDate(values?: CalendarValue) {
  return values ? new Date(values.month, values.year, 1) : new Date();
}

export function useDate(defaultValue?: CalendarValue) {
  const [selectedDate, setSelectedDate] = useState<Date>(() => getCalendarDate(defaultValue));

  function nextMonth() {
    setSelectedDate((previousDate) => {
      const newDate = new Date(previousDate);
      newDate.setMonth(previousDate.getMonth() + 1);
      return newDate;
    });
  }

  function previousMonth() {
    setSelectedDate((previousDate) => {
      const newDate = new Date(previousDate);
      newDate.setMonth(previousDate.getMonth() - 1);
      return newDate;
    });
  }

  return {
    nextMonth,
    previousMonth,
    date: selectedDate,
  };
}
