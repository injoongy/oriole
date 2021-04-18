import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import * as child from 'child_process';

export const Commits: FC = () => {
  const { exit } = useApp();
  const [gitLog, setGitLog] = useState('');
  const [showGitLog, setShowGitLog] = useState(false);

  if (!gitLog) {
    const log = child.execSync('git log -n 10');
    const logString = log ? log.toString() : ''; // if log is null, like when exiting git log, there's an error - so ternary will resolve this
    setGitLog(logString);
    setShowGitLog(true);
  }

  return (
    <Box flexDirection='column'>
      <Text>Here are your latest commits in this repo:</Text>
      {showGitLog && (
        <Box marginTop={1}>
          <Text>{gitLog}</Text>
        </Box>
      )}
    </Box>
  );
};
