import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'ink';

import SetOptions from '../lib/components/SetOptions';

/// set command
const set = () => {
  return (
    <Box flexDirection="column">
      <SetOptions />
    </Box>
  );
};

export default set;
