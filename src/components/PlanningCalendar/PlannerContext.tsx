import React from 'react';

export interface PlannerContextValue {
  id: string;
}

export const PlannerContext = React.createContext<PlannerContextValue | null>(null);
