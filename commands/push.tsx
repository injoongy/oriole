import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'ink';
import { Commits } from '../lib/components/Commits';
import { CommitsProps } from '../lib/components/Commits/Commits.interface';

/// push command
const push: FC<CommitsProps> = ({ hours }) => (
  <Box flexDirection='column'>
    <Commits hours={hours} />
  </Box>
);

push.propTypes = {
  /// The hours spent on this Harvest entry.
  hours: PropTypes.number.isRequired,
};

// @ts-ignore: shortFlags property is a Pastel built-in property, not something for the push component/CommitsProps interface definition
push.shortFlags = {
  hours: 'h',
};

export default push;
