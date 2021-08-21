import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import { Error } from '../Error';
import {
  HarvestError,
} from '../../utils/harvest/harvest.interface';

export const PaidTimeOff: FC = () => {
  const [error, setError] = useState<HarvestError>();
  const [hours, setHours] = useState('');

  if (!hours) {
    setHours('Hello');
  }

  return (
    <Box flexDirection='column'>
      {error && error.status ? (
        <Box marginBottom={1}>
          <Error status={error.status} />
        </Box>
      ) : null}
      {hours ? (
        <Box marginBottom={1}>
          <Text>Your total PTO hours spent this calendar year are: {hours}</Text>
        </Box>
      ) : null}
    </Box>
  );
};
