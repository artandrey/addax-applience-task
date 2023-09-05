import React, { FocusEvent, useEffect, useRef, useState } from 'react';
import { Tag, Task } from '../../types/Planner';
import styled from 'styled-components';
import TagsList from '../TagsList';
import { useTagsStore } from '../../hooks/useTagsStorage';
import '@total-typescript/ts-reset/filter-boolean';
import { useHover } from 'react-aria';
import { usePlannerItem } from '../../hooks/usePlannerItem';

interface TaskCardProps extends Task {
  isEditing?: boolean;
  handleEdit?: (task: Task) => void;
}

interface CardWrapperProps {
  $editing?: boolean;
}

const CardWrapper = styled.div<CardWrapperProps>`
  padding: 0.4rem;
  margin-bottom: 0.2rem;
  font-size: 0.8rem;
  background-color: #fff;
  border-radius: 0.4rem;
  position: relative;
  z-index: ${(props) => (props.$editing ? 1 : 0)};
`;

const Textarea = styled.textarea`
  width: 100%;
  resize: none;
`;

const TaskCard: React.FC<TaskCardProps> = ({ handleEdit, ...task }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { getTag } = useTagsStore();
  const { isHovered, hoverProps } = useHover({});

  const { content, tags } = task;

  const { updateTask } = usePlannerItem();

  function handleTagAdd(tag: Tag) {
    const updatedTask = {
      ...task,
      tags: [...task.tags, tag.id],
    };

    updateTask(updatedTask);
  }

  useEffect(() => {
    textareaRef.current?.focus();
  }, [isEditing]);

  function handleBlur(event: FocusEvent<HTMLTextAreaElement>) {
    handleEdit && handleEdit({ ...task, content: event.target.value });
    setIsEditing(false);
  }

  return (
    <CardWrapper {...hoverProps} onDoubleClick={() => setIsEditing(true)} $editing={isEditing}>
      <TagsList handleTagAdd={handleTagAdd} showEdit={isHovered} tags={tags.map(getTag).filter(Boolean)} />
      {isEditing ? <Textarea onBlur={handleBlur}>{content}</Textarea> : <span>{content}</span>}
    </CardWrapper>
  );
};

export default TaskCard;
