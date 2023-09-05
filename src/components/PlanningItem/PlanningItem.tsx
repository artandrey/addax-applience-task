import React from 'react';
import { PlannedDate } from '../../types/Planner';
import { MonthDay } from '../../util/calendar';
import TasksList from '../TasksList';
import styled from 'styled-components';

interface PlanningItemProps extends PlannedDate {
  date: MonthDay;
}

interface WrapperProps {
  $active?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  padding: 0.5rem 0.5rem 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  background-color: ${(props) => (props.$active ? '#c4cce2' : '#f3e9e9')};
  border: solid #222 1px;
`;

const Heading = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 1rem;
`;

const HeadingAnnotation = styled.div`
  font-size: 0.75rem;
  color: #474747;
`;

interface DateTextProps {
  $currentMonth?: boolean;
}

const DateText = styled.span<DateTextProps>`
  font-size: 1.2rem;
  font-weight: ${(props) => (props.$currentMonth ? '700' : '400')};
`;

const PlanningItem: React.FC<PlanningItemProps> = ({ tasks, date }) => {
  return (
    <Wrapper $active={date.isCurrentMonth}>
      <Heading>
        <DateText $currentMonth={date.isCurrentMonth}>{date.getFormatted()}</DateText>
        <HeadingAnnotation>
          {tasks.length} {tasks.length === 1 ? 'card' : 'cards'}
        </HeadingAnnotation>
      </Heading>
      {date.isCurrentMonth && <TasksList itemId={date.getFullDate()} items={tasks} />}
    </Wrapper>
  );
};

export default PlanningItem;
