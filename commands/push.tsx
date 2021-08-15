import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'ink';
import { Commits } from '../lib/components/Commits';
import { PushProps } from '../lib/utils/commandTypes.interface';

/// Create a timesheet entry out of the most recent git commit messages in this repo (made today between 6am and 6pm local time) and push it up to Harvest.
const push: FC<PushProps> = ({ hours }) => (
  <Box flexDirection='column'>
    <Commits hours={hours} />
  </Box>
);

push.propTypes = {
  /// Set the hours spent on this Harvest entry.
  hours: PropTypes.number.isRequired,
};

// @ts-ignore: shortFlags property is a Pastel built-in property, not something for the push component/CommitsProps interface definition
push.shortFlags = {
  hours: 'h',
};

export default push;
