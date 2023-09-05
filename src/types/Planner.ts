import { Id } from '../util/generateId';

export interface Tag {
  id: Id;
  colorHex: string;
}

export type TagCreationOptions = Omit<Tag, 'id'>;

export interface Task {
  id: Id;
  content: string;
  tags: Id[];
}

export type TaskCreationOptions = Omit<Task, 'id' | 'tags'>;

export interface PlannedDate {
  tasks: Task[];
}
