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
  hours: PropTypes.number,
};

push.defaultProps = {
  hours: 3,
};

export default push;
