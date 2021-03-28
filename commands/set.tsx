import React, { FC } from 'react';
import { Box } from 'ink';

import { SetOptions } from '../lib/components/SetOptions';

/// set command
const set: FC = () => {
  return (
    <Box flexDirection='column'>
      <SetOptions />
    </Box>
  );
};

export default set;
