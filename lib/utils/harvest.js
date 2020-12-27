import fetch from 'node-fetch';
import { getData } from './store';

const buildOptions = async () => {
  const token = await getData('token');
  const accountId = await getData('accountId');

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Harvest-Account-ID': accountId,
    },
  };

  return options;
};

const getHarvestData = async url => {
  const options = await buildOptions();
  const response = await fetch(url, options);
  return await response.json();
};

export default getHarvestData;
