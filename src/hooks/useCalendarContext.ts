import { useContext } from 'react';
import { CalendarContext, CalendarControls } from '../components/Calendar/CalendarContext';

export function useCalendarContext(): CalendarControls {
  const calendarControls = useContext(CalendarContext);
  if (!calendarControls) throw new Error('Component was not wrapped into Calendar component');
  return calendarControls;
}
