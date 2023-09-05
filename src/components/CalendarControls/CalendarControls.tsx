import React from 'react';
import { useCalendarContext } from '../../hooks/useCalendarContext';
import Button from '../Button';
import styled from 'styled-components';

const CalendarControlsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 2rem 0;
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 2rem;
`;

const CalendarControls: React.FC = () => {
  const { nextMonth, previousMonth, month, year } = useCalendarContext();
  return (
    <CalendarControlsWrapper>
      <Button onClick={previousMonth}>Previous</Button>
      <DateWrapper>
        <span>{month}</span>
        <span>{year}</span>
      </DateWrapper>
      <Button onClick={nextMonth}>Next</Button>
    </CalendarControlsWrapper>
  );
};

export default CalendarControls;
