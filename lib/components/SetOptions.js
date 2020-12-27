import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import fetch from 'node-fetch';
import { getData } from '../utils/store';

const SetOptions = () => {
  const { exit } = useApp();
  const [userProjects, setUserProjects] = useState([]);

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

  const testFetch = async () => {
    const options = await buildOptions();
    const response = await fetch('https://api.harvestapp.com/v2/users/me', options);
    const json = await response.json();
    console.log('json', json);
  };

  testFetch();

  return (
    <Box flexDirection="column">
      <Text color="green">Set Options Here</Text>
    </Box>
  );
};

export default SetOptions;
