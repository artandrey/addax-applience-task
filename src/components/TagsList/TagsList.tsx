import React, { useMemo, useRef } from 'react';
import { Tag } from '../../types/Planner';
import { useTagsStore } from '../../hooks/useTagsStorage';
import Button from '../Button';
import styled from 'styled-components';
import { useHover } from 'react-aria';

interface TagSelectFormProps {
  availableTags: Tag[];
  onTagSelect?: (tag: Tag) => void;
}

const TagSelectForm: React.FC<TagSelectFormProps> = ({ availableTags, onTagSelect }) => {
  if (!availableTags.length) return null;

  function handleTagSelect(tag: Tag) {
    onTagSelect && onTagSelect(tag);
  }

  return (
    <div>
      <span>Add tag: </span>
      <ul>
        {availableTags.map((tag) => (
          <li onClick={() => handleTagSelect(tag)} key={tag.id}>
            <TagItem {...tag} editable={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};

interface TagBageProps {
  $color: string;
}

const TagBage = styled.div<TagBageProps>`
  padding: 0.4rem;
  border-radius: 0.2rem;
  width: 2rem;
  background-color: ${(props) => props.$color};
  cursor: pointer;
`;

interface TagItemProps extends Tag {
  editable?: boolean;
}

const TagItem: React.FC<TagItemProps> = ({ colorHex, id, editable }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isHovered, hoverProps } = useHover({
    onHoverEnd: () => {
      handleColorChange(inputRef.current?.value ?? colorHex);
    },
  });
  const updateTag = useTagsStore((state) => state.updateTag);

  function handleColorChange(value: string) {
    updateTag({ id, colorHex: value });
  }

  return (
    <TagBage {...hoverProps} $color={colorHex}>
      {editable && isHovered && <input ref={inputRef} defaultValue={colorHex} type="color" />}
    </TagBage>
  );
};

const TagsUl = styled.ul`
  list-style: none;
  display: flex;
  gap: 0.2rem;
  flex-wrap: wrap;
`;

interface TagsListProps {
  tags: Tag[];
  showEdit?: boolean;
  handleTagAdd?: (tag: Tag) => void;
}

const TagsList: React.FC<TagsListProps> = ({ tags, showEdit, handleTagAdd }) => {
  const createTag = useTagsStore((state) => state.createTag);
  const allTags = useTagsStore((state) => state.tags);

  function createNewTag() {
    const tag = createTag({ colorHex: '#adadad' });
    handleTagAdd && handleTagAdd(tag);
  }

  const availableTags = useMemo(() => {
    return allTags.filter((tag) => !tags.includes(tag));
  }, [tags, allTags]);

  return (
    <div>
      <TagsUl>
        {tags.map((tag) => (
          <li key={tag.id}>
            <TagItem editable={showEdit} {...tag} />
          </li>
        ))}
      </TagsUl>
      {showEdit && <Button onClick={createNewTag}>New tag</Button>}
      {showEdit && <TagSelectForm onTagSelect={handleTagAdd} availableTags={availableTags} />}
    </div>
  );
};

export default TagsList;
