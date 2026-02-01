export interface Participant {
  id: string;
  name: string;
  organization: string;
  score: number;
}

export type SortDirection = 'asc' | 'desc';

export interface AdminState {
  isAdminOpen: boolean;
  unlockCount: number;
  lastClickTime: number;
}
