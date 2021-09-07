import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'ink';
import { Commits } from '../lib/components/Commits';
import { PushProps } from '../lib/utils/commandTypes.interface';

/// Create a timesheet entry out of the most recent git commit messages in this repo (for commits made today, local time) and push it up to Harvest.
const push: FC<PushProps> = ({ hours, date }) => (
  <Box flexDirection='column'>
    <Commits hours={hours} commitDate={date} />
  </Box>
);

push.propTypes = {
  /// Set the hours spent on this Harvest entry.
  hours: PropTypes.number.isRequired,
  /// Get the commits made on the specified date.
  date: PropTypes.string,
};

// @ts-ignore: shortFlags property is a Pastel built-in property, not something for the push component/CommitsProps interface definition
push.shortFlags = {
  hours: 'h',
  date: 'd',
};

export default push;
