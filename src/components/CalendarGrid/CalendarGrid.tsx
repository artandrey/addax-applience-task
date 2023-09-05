import { ReactNode, forwardRef } from 'react';
import { DAYS_IN_WEEK, MonthDay } from '../../util/calendar';
import { useCalendarContext } from '../../hooks/useCalendarContext';
import { styled } from 'styled-components';

interface CalendarGridProps {
  children: (day: MonthDay) => ReactNode;
  ref?: HTMLDivElement;
}

interface GridProps {
  $columnsCount: number;
}

const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$columnsCount}, 1fr);
  gap: 0.2rem;
`;

const Cell = styled.div`
  aspect-ratio: 3/2;
`;

const CalendarGrid = forwardRef<HTMLDivElement, CalendarGridProps>(({ children }, ref) => {
  const { monthDays } = useCalendarContext();
  return (
    <Grid $columnsCount={DAYS_IN_WEEK} ref={ref}>
      {monthDays.map((day) => (
        <Cell key={day.getFullDate()}>{children(day)}</Cell>
      ))}
    </Grid>
  );
});

export default CalendarGrid;
