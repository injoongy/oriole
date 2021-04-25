import { Headers } from 'node-fetch';

export interface Options {
  method: string;
  headers: Headers;
  body?: string;
}

export interface HarvestError {
  status?: number;
}

export interface HarvestEntry {
  project_id: number;
  task_id: number;
  spent_date: string;
  hours: number;
  notes: string;
}
