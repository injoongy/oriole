import React, { FC } from 'react';
import { Text, Box } from 'ink';

import { InitFields } from '../lib/components/InitFields';

/// init command
const init: FC = () => {
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
      <InitFields />
    </Box>
  );
};

export default init;
