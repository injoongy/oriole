import React, { FC } from 'react';
import { Box } from 'ink';

import { InitOptions } from '../lib/components/InitOptions';

/// Initialize the current repo with a Harvest project ID and task ID. These IDs will then be used when running `oriole push` to create a Harvest timesheet entry.
const init: FC = () => (
  <Box flexDirection='column'>
    <InitOptions />
  </Box>
);

export default init;
