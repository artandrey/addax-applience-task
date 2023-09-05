import { PlannedDate, Task, TaskCreationOptions } from '../types/Planner';
import { generateId } from '../util/generateId';
import { create } from 'zustand';
import { Setter } from '../types/StateResolver';

type UpdateAction<T> = ((currentValue: T) => T) | T;

export function createEmptyPlannedDate(): PlannedDate {
  return { tasks: [] };
}

interface PlannerStore {
  dates: Record<string, PlannedDate>;
  addTask(key: string, task: TaskCreationOptions): void;
  updateTask(key: string, updatedTask: Task): void;
  moveTask(currentKey: string, destinationKey: string, currentIndex: number, destinationIndex: number): void;

  reorderTask(key: string, currentIndex: number, destinationIndex: number): void;
}

function updateDate(key: string, updateAction: UpdateAction<PlannedDate>, set: Setter<PlannerStore>) {
  set(({ dates }) => {
    const selectedDate = dates[key] ?? createEmptyPlannedDate();
    const updateResult = typeof updateAction === 'function' ? updateAction(selectedDate) : updateAction;
    return {
      dates: {
        ...dates,
        [key]: updateResult,
      },
    };
  });
}

export const usePlannerStore = create<PlannerStore>((set) => ({
  dates: {},
  addTask(key: string, task: TaskCreationOptions) {
    updateDate(
      key,
      (plannedDate) => ({
        ...plannedDate,
        tasks: [...plannedDate.tasks, { id: generateId(), tags: [], ...task }],
      }),
      set
    );
  },
  updateTask(key: string, updatedTask: Task) {
    updateDate(
      key,
      (plannedDate) => {
        const tasks = [...plannedDate.tasks];
        const taskIndex = tasks.findIndex((task) => updatedTask.id === task.id);
        tasks.splice(taskIndex, 1, updatedTask);

        return {
          ...plannedDate,
          tasks,
        };
      },
      set
    );
  },

  reorderTask(key: string, currentIndex: number, destinationIndex: number) {
    updateDate(
      key,
      (plannedDate) => {
        const tasks = [...plannedDate.tasks];
        const [movedTask] = tasks.splice(currentIndex, 1);
        tasks.splice(destinationIndex, 0, movedTask);
        return {
          ...plannedDate,
          tasks,
        };
      },
      set
    );
  },
  moveTask(currentKey: string, destinationKey: string, currentIndex: number, destinationIndex: number) {
    let task: Task;
    updateDate(
      currentKey,
      (plannedDate) => {
        const tasks = [...plannedDate.tasks];
        const [movedTask] = tasks.splice(currentIndex, 1);
        task = movedTask;

        return {
          ...plannedDate,
          tasks,
        };
      },
      set
    );
    updateDate(
      destinationKey,
      (plannedDate) => {
        const tasks = [...plannedDate.tasks];
        tasks.splice(destinationIndex, 0, task);
        return {
          ...plannedDate,
          tasks,
        };
      },
      set
    );
  },
}));
