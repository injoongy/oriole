import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import Conf from 'conf';

const SetOptions = () => {
  const { exit } = useApp();

  return (
    <Box flexDirection="column">
      <Text color="green">Set Options Here</Text>
    </Box>
  )
};

export default SetOptions;
