import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'ink';
import { PaidTimeOff } from '../lib/components/PaidTimeOff';
import { PtoProps } from '../lib/utils/commandTypes.interface';

/// Get the total number of hours of PTO you've logged in Harvest for this calendar year.
/// If a year is specified, you will get the total number of PTO hours spent for that year only.
const pto: FC<PtoProps> = ({ year }) => (
  <Box flexDirection='column'>
    <PaidTimeOff year={year} />
  </Box>
);

pto.propTypes = {
  /// The year for which you'd like to see the total number of PTO hours spent.
  year: PropTypes.number,
};

// @ts-ignore: shortFlags property is a Pastel built-in property, not something for the pto component/PtoProps interface definition
pto.shortFlags = {
  year: 'y',
};

export default pto;
