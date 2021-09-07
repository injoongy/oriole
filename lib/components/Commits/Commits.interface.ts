export interface CommitsProps {
  hours?: number;
  commitDate?: string;
}

export interface Choice {
  label: string;
  value: string;
}

export interface EntryData {
  projectId?: string;
  taskId?: string;
}

export interface ExistingEntryData {
  id?: string;
  notes?: string;
  hours?: number;
}
