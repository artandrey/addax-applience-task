import { useMemo, useState } from 'react';
import { PlannedDate } from '../types/Planner';
import { Id } from '../util/generateId';

function isSubstingIgnoreCase(value: string, substringOf: string) {
  return substringOf.toLocaleLowerCase().includes(value.toLocaleLowerCase());
}

export function usePlannerFilter(plannedDates: Record<string, PlannedDate>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [allowedTagsIds, setAllowedTagsIds] = useState<Id[]>([]);

  const result = useMemo(() => {
    const filteredDates: Record<string, PlannedDate> = {};
    for (const [key, plannedDate] of Object.entries(plannedDates)) {
      filteredDates[key] = {
        tasks: plannedDate.tasks.filter((task) => {
          const isMatchesSearchQuery = isSubstingIgnoreCase(searchQuery, task.content);
          const isMatchesTagFilter = allowedTagsIds.length ? task.tags.some((tagId) => allowedTagsIds.includes(tagId)) : true;
          return isMatchesSearchQuery && isMatchesTagFilter;
        }),
      };
    }
    return filteredDates;
  }, [searchQuery, allowedTagsIds, plannedDates]);

  return { result, setSearchQuery, setAllowedTagsIds };
}
