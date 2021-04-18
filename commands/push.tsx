import React, { FC } from 'react';
import { Box } from 'ink';
import { Commits } from '../lib/components/Commits';

/// push command
const push: FC = () => {
  return (
    <Box flexDirection='column'>
      <Commits />
    </Box>
  );
};

export default push;
