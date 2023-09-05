import { Tag, TagCreationOptions } from '../types/Planner';
import { Id, generateId } from '../util/generateId';
import { create } from 'zustand';

interface TagsStore {
  createTag: (tagOptions: TagCreationOptions) => Tag;
  getTag: (id: Id) => Tag | undefined;
  updateTag: (tag: Tag) => void;
  tags: Tag[];
}

export const useTagsStore = create<TagsStore>((set, get) => ({
  tags: [],
  createTag(tagOptions: TagCreationOptions) {
    const tag = { id: generateId(), ...tagOptions };
    set(({ tags }) => ({ tags: [...tags, tag] }));
    return tag;
  },
  updateTag(updatedTag: Tag) {
    set(({ tags }) => {
      const tagIndex = tags.findIndex((tag) => tag.id === updatedTag.id);
      const newTags = [...tags];
      newTags.splice(tagIndex, 1, updatedTag);
      return { tags: newTags };
    });
  },
  getTag(id: Id) {
    return get().tags.find((tag) => tag.id === id);
  },
}));
