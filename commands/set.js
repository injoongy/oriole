import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';

/// set command
const set = () => {
  return (
    <Box flexDirection="column">
      <Text>
        Please choose which Harvest project you want to link with the current directory.
      </Text>
    </Box>
  );
};

export default set;
