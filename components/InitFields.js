import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp, useStdout } from 'ink';
import TextInput from 'ink-text-input';
import conf from 'conf';

const InitFields = () => {
  const { exit } = useApp();
  const { write } = useStdout();
  const config = new conf();

  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [showAccountField, setShowAccountField] = useState(false);
  const [showBothFields, setShowBothFields] = useState(false);

  const handleToken = value => setShowAccountField(true);
  const handleAccountId = value => {
    config.set('token', token);
    config.set('accountId', accountId);

    console.log('config token', config.get('token'));
    console.log('config accountId', config.get('accountId'));
    setShowBothFields(true); // write to file? Save to state? Follow my example in weatherbee using config.js?
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
      {showBothFields && (
        <Box marginTop={1}>
          <Text>Token: {token}, ID: {accountId}</Text>
        </Box>
      )}
    </Box>
  );
};

export default InitFields;
