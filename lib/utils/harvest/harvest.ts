import fetch, { Headers } from 'node-fetch';
import { getData } from '../store';
import { Options, HarvestEntry } from './harvest.interface';

const buildOptions = async (method: string, body?: string) => {
  const token = await getData('token');
  const accountId = await getData('accountId');

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Harvest-Account-ID', accountId);
  headers.set('Content-Type', 'application/json');

  const options: Options = {
    method,
    headers,
    body,
  };

  return options;
};

export const getHarvestData = async (url: string) => {
  const options = await buildOptions('GET');
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status }));
  } else {
    return response.json();
  }
};

export const pushHarvestEntry = async (
  url: string,
  entryData: HarvestEntry,
) => {
  const options = await buildOptions('POST', JSON.stringify(entryData));
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status }));
  } else {
    return response.ok;
  }
};
