import { Draggable, Droppable } from '@hello-pangea/dnd';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { Task } from '../../types/Planner';
import styled from 'styled-components';
import TaskCard from '../TaskCard';
import { useHover } from 'react-aria';
import Button from '../Button';
import { usePlannerItem } from '../../hooks/usePlannerItem';

const ListWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const List = styled.ul`
  padding: 0.5rem;
  width: 100%;
  height: 80px;
  list-style: none;
  overflow-y: auto;
`;

const Textarea = styled.textarea`
  width: 100%;
`;

interface DroppableListProps extends PropsWithChildren {
  itemId: string;
}

const DroppableList: React.FC<DroppableListProps> = ({ itemId, children }) => {
  return (
    <Droppable droppableId={itemId}>
      {({ droppableProps, innerRef, placeholder }) => (
        <List ref={innerRef} {...droppableProps}>
          {children}
          {placeholder}
        </List>
      )}
    </Droppable>
  );
};

interface DraggableTaskProps {
  task: Task;
  index: number;
  handleEdit?: (task: Task) => void;
}

const DraggableTask: React.FC<DraggableTaskProps> = ({ task, index, handleEdit }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <li ref={innerRef} {...dragHandleProps} {...draggableProps}>
          <TaskCard handleEdit={handleEdit} {...task} />
        </li>
      )}
    </Draggable>
  );
};

interface TaskCreationFromProps {
  handleCreate: (content: string) => void;
}

const TaskCreationForm: React.FC<TaskCreationFromProps> = ({ handleCreate }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit() {
    const value = textareaRef.current?.value;
    value && handleCreate(value);
  }

  return (
    <>
      <Textarea ref={textareaRef}></Textarea>
      <Button onClick={handleSubmit}>Ready</Button>
    </>
  );
};

interface TasksListProps {
  itemId: string;
  items: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ itemId, items }) => {
  const { hoverProps, isHovered } = useHover({});
  const [isCreating, setIsCreating] = useState(false);
  const { addTask, updateTask } = usePlannerItem();

  function handleTaskCreated(content: string) {
    setIsCreating(false);
    addTask({ content });
  }

  function handleTaskUpdate(task: Task) {
    updateTask(task);
  }

  return (
    <ListWrapper {...hoverProps}>
      {!isCreating && (
        <DroppableList itemId={itemId}>
          {items.map((task, i) => (
            <DraggableTask handleEdit={handleTaskUpdate} key={task.id} index={i} task={task} />
          ))}
        </DroppableList>
      )}
      {isCreating && <TaskCreationForm handleCreate={handleTaskCreated} />}
      {isHovered && !isCreating && (
        <Button onClick={() => setIsCreating(true)} style={{ position: 'absolute', bottom: 0, left: '50%', translate: '-50%' }}>
          Add new
        </Button>
      )}
    </ListWrapper>
  );
};

export default TasksList;
