import React, { FC } from 'react';
import { Box } from 'ink';
import { PaidTimeOff } from '../lib/components/PaidTimeOff';
import { PushProps } from '../lib/utils/commandTypes.interface';

/// Get the total number of hours of PTO you've logged in Harvest for this calendar year.
const pto: FC<PushProps> = () => (
  <Box flexDirection='column'>
    <PaidTimeOff />
  </Box>
);

export default pto;
