import React, { FC } from 'react';
import { Text, Box } from 'ink';

import { SetupFields } from '../lib/components/SetupFields';

/// setup command
const setup: FC = () => {
  return (
    <Box flexDirection='column'>
      <Text>
        Please enter your Harvest Personal Access Token and your Harvest Account
        ID here.
      </Text>
      <Text>
        Tokens and IDs can be found at
        <Text color='blue'>
          {' '}
          https://id.getharvest.com/oauth2/access_tokens/new
        </Text>
        .
      </Text>
      <SetupFields />
    </Box>
  );
};

export default setup;
