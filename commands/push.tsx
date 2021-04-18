import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import * as child from 'child_process';
import TextInput from 'ink-text-input';

/// push command
const push: FC = () => {
  const { exit } = useApp();
  const [message, setMessage] = useState('');
  const [gitLog, setGitLog] = useState('');
  const [showGitLog, setShowGitLog] = useState(false);

  const handleSubmit = () => {
    const log = child.execSync('git log -n 10');
    const logString = log ? log.toString() : ''; // if log is null, like when exiting git log, there's an error - so ternary will resolve this
    setGitLog(logString);
    setShowGitLog(true);
    exit();
  };

  return (
    <Box flexDirection='column'>
      {!showGitLog ? (
        <Box flexDirection='column'>
          <Text>Here are your latest commits in this repo:</Text>
          <TextInput
            value={message}
            onChange={setMessage}
            onSubmit={handleSubmit}
          />
        </Box>
      ) : (
        <Box marginTop={1}>
          <Text>{gitLog}</Text>
        </Box>
      )}
    </Box>
  );
};

export default push;
