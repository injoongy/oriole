import { Headers } from 'node-fetch';

export interface Options {
  method: string;
  headers: Headers;
}

export interface HarvestError {
  status?: number;
}
