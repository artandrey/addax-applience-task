import { useContext } from 'react';
import { PlannerContext } from '../components/PlanningCalendar/PlannerContext';
import { Task, TaskCreationOptions } from '../types/Planner';
import { usePlannerStore } from './usePlannerStore';

export function usePlannerItem() {
  const planner = useContext(PlannerContext);
  const { addTask, updateTask } = usePlannerStore();
  if (!planner) throw new Error('This element was not wrapped in Planner Context provider');
  const { id } = planner;

  return {
    addTask: (taskOptions: TaskCreationOptions) => addTask(id, taskOptions),
    updateTask: (task: Task) => updateTask(id, task),
  };
}
