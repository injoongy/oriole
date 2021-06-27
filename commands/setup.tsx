import React, { FC } from 'react';
import { Text, Box } from 'ink';

import { SetupFields } from '../lib/components/SetupFields';

/// Set up your Harvest account info on this machine so that the other `oriole` commands can function properly.
const setup: FC = () => (
  /* TODO: Add logic to show if a user has already authenticated if their
  token and ID are already found in the store? And confirm that they'd like
  to re-authenticate? And if we implement this, then add flag as a shortcut?
  To skip the prompt? */
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

export default setup;
