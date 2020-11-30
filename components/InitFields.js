import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp, useStdout } from 'ink';
import TextInput from 'ink-text-input';
import conf from 'conf';
import bcrypt from 'bcryptjs';

const InitFields = () => {
  const { exit } = useApp();
  const { write } = useStdout();
  const config = new conf();

  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [showAccountField, setShowAccountField] = useState(false);
  const [savedBothFields, setSavedBothFields] = useState(false);

  const handleToken = value => setShowAccountField(true);
  const handleAccountId = value => {
    const hashedToken = bcrypt.hashSync(token, 10);
    const hashedAccountId = bcrypt.hashSync(accountId, 10);

    config.set('token', hashedToken);
    config.set('accountId', hashedAccountId);

    setSavedBothFields(true);
    exit();
  }

  return (
    <Box flexDirection="column">
      <Box marginTop={1}>
      	<Box marginRight={1}>
          <Text color="green">❯</Text>
      	</Box>
      	<TextInput
          placeholder="Enter your Harvest Personal Access Token here."
          focus={!showAccountField}
          showCursor={false}
          value={token}
          onChange={setToken}
          onSubmit={handleToken}
      	/>
      </Box>
      {showAccountField && (
      	<Box>
          <Box marginRight={1}>
            <Text color="green">❯</Text>
          </Box>
          <TextInput
            placeholder="Enter your Harvest Account ID here."
            focus={showAccountField}
            showCursor={false}
            value={accountId}
            onChange={setAccountId}
            onSubmit={handleAccountId}
          />
      	</Box>
      )}
      {savedBothFields && (
        <Box marginTop={1}>
          <Text>Your user info has been saved successfully.</Text>
        </Box>
      )}
    </Box>
  );
};

export default InitFields;
