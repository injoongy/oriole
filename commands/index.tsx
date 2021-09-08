import React, { FC } from 'react';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { version } from '../package.json';

/// Command to display the version.
const oriole: FC = () => (
  <Gradient colors={['red', 'orange']}>
    <BigText text={`ORIOLE v${version}`} />
  </Gradient>
);

export default oriole;
