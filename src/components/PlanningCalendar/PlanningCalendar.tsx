import React, { useRef } from 'react';
import PlanningItem from '../PlanningItem';
import { createEmptyPlannedDate, usePlannerStore } from '../../hooks/usePlannerStore.ts';
import Calendar from '../Calendar';
import CalendarGrid from '../CalendarGrid';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { PlannerContext } from './PlannerContext.tsx';
import { useExportToImage } from '../../hooks/useExportToImage.ts';
import Button from '../Button/';
import { download, exportTableToJsonFile, getFormatFromImageMime } from '../../util/download.ts';
import { styled } from 'styled-components';
import { useTagsStore } from '../../hooks/useTagsStorage.ts';
import CalendarControls from '../CalendarControls/CalendarControls.tsx';
import SearchForm from '../SearchForm/SearchForm.tsx';
import { usePlannerFilter } from '../../hooks/usePlannerFilter.ts';
import TagsFilter from '../TagsFilter/TagsFilter.tsx';

const ControlsWrapper = styled.div`
  padding: 2rem;
  display: flex;
  gap: 1rem;
`;

const PlanningCalendar: React.FC = () => {
  const { dates, moveTask, reorderTask } = usePlannerStore();
  const { tags } = useTagsStore();

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;

    if (sourceId === destinationId) {
      reorderTask(sourceId, source.index, destination.index);
    } else {
      moveTask(sourceId, destinationId, source.index, destination.index);
    }
  }

  const { result: filteredDates, setSearchQuery, setAllowedTagsIds } = usePlannerFilter(dates);

  const elementRef = useRef<HTMLDivElement>(null);

  const convertToImage = useExportToImage({
    ref: elementRef,
    onExport: ({ dataUrl, mimeType }) => {
      download(dataUrl, 'calendar.' + getFormatFromImageMime(mimeType));
    },
  });

  function exportToJson() {
    exportTableToJsonFile(dates, tags);
  }

  return (
    <>
      <SearchForm handleSearch={setSearchQuery} />
      <TagsFilter handleUpdate={setAllowedTagsIds} />
      <Calendar>
        <CalendarControls />
        <DragDropContext onDragEnd={handleDragEnd}>
          <CalendarGrid ref={elementRef}>
            {(date) => (
              <PlannerContext.Provider value={{ id: date.getFullDate() }}>
                <PlanningItem date={date} {...(filteredDates[date.getFullDate()] ?? createEmptyPlannedDate())} />
              </PlannerContext.Provider>
            )}
          </CalendarGrid>
          <ControlsWrapper>
            <Button onClick={() => convertToImage()}>Export as image</Button>
            <Button onClick={() => exportToJson()}>Export as JSON</Button>
          </ControlsWrapper>
        </DragDropContext>
      </Calendar>
    </>
  );
};

export default PlanningCalendar;
