import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SetOptions from '../components/SetOptions';

/// set command
const set = () => {
  return (
    <Box flexDirection="column">
      <Text>
        Please choose which Harvest project you want to link with the current directory.
      </Text>
      <SetOptions />
    </Box>
  );
};

export default set;
