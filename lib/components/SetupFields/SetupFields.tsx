import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import TextInput from 'ink-text-input';

import { saveData } from '../../utils/store';

export const SetupFields: FC = () => {
  const { exit } = useApp();

  const [token, setToken] = useState('');
  const [accountId, setAccountId] = useState('');
  const [showAccountField, setShowAccountField] = useState(false);
  const [savedBothFields, setSavedBothFields] = useState(false);

  const handleToken = () => setShowAccountField(true);
  const handleAccountId = () => {
    saveData('token', token);
    saveData('accountId', accountId);

    setSavedBothFields(true);
    exit();
  };

  return (
    <Box flexDirection='column'>
      <Box marginTop={1}>
        <Box marginRight={1}>
          <Text color='green'>❯</Text>
        </Box>
        <TextInput
          placeholder='Enter your Harvest Personal Access Token here.'
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
            <Text color='green'>❯</Text>
          </Box>
          <TextInput
            placeholder='Enter your Harvest Account ID here.'
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
