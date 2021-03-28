import fetch, { Headers } from 'node-fetch';
import { getData } from '../store';
import { Options } from './harvest.interface';

const buildOptions = async () => {
  const token = await getData('token');
  const accountId = await getData('accountId');

  const headers = new Headers();
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Harvest-Account-ID', accountId);

  const options: Options = {
    method: 'GET',
    headers,
  };

  return options;
};

export const getHarvestData = async (url: string) => {
  const options = await buildOptions();
  const response = await fetch(url, options);
  if (!response.ok) {
    throw { status: response.status };
  } else {
    return await response.json();
  }
};
