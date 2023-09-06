import React from 'react';
import { Label, Tag, TagGroup, TagList, Selection } from 'react-aria-components';
import { useTagsStore } from '../../hooks/useTagsStorage';
import styled from 'styled-components';
import { Id } from '../../util/generateId';

interface BageProps {
  $color: string;
  $isSelected: boolean;
}

const Bage = styled.div<BageProps>`
  width: 2rem;
  height: 1rem;
  background-color: ${(props) => (props.$isSelected ? props.$color : 'transparent')};
  border: solid ${(props) => props.$color} 2px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledGroup = styled(TagGroup)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const StyledTagList = styled(TagList)`
  display: flex;
  max-width: 10rem;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const StyledLabel = styled(Label)`
  font-size: 1.5rem;
  text-align: center;
`;

interface TagsFilterProps {
  handleUpdate?: (tagsIds: Id[]) => void;
}

const TagsFilter: React.FC<TagsFilterProps> = ({ handleUpdate }) => {
  const { tags } = useTagsStore();

  function handleSelectionChange(selection: Selection) {
    if (typeof selection === 'string') return;
    handleUpdate && handleUpdate([...selection] as string[]);
  }

  return (
    <Wrapper>
      <StyledGroup onSelectionChange={handleSelectionChange} selectionMode="multiple">
        <StyledLabel>Tags filter</StyledLabel>
        <StyledTagList>
          {tags.map((tag) => (
            <Tag id={tag.id} key={tag.id}>
              {({ isSelected }) => <Bage $isSelected={isSelected} $color={tag.colorHex} />}
            </Tag>
          ))}
        </StyledTagList>
      </StyledGroup>
    </Wrapper>
  );
};

export default TagsFilter;
