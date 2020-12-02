import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp } from 'ink';
import TextInput from 'ink-text-input';
import keytar from 'keytar';
import crypto from 'crypto';
import Conf from 'conf';

const InitFields = () => {
  const { exit } = useApp();

  const encryptionKey = crypto.randomBytes(256).toString('base64');
  const config = new Conf({ encryptionKey });

  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [showAccountField, setShowAccountField] = useState(false);
  const [savedBothFields, setSavedBothFields] = useState(false);

  const handleToken = () => setShowAccountField(true);
  const handleAccountId = () => {
    keytar.setPassword('oriole', 'secret', encryptionKey);
    config.set('token', token);
    config.set('accountId', accountId);

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
