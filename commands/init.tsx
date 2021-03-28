import React, { FC } from 'react';
import { Box } from 'ink';

import { InitOptions } from '../lib/components/InitOptions';

/// init command
const init: FC = () => {
  return (
    <Box flexDirection='column'>
      <InitOptions />
    </Box>
  );
};

export default init;
