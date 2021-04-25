import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import * as child from 'child_process';

export const Commits: FC = () => {
  const { exit } = useApp();
  const [gitLog, setGitLog] = useState('');
  const [showGitLog, setShowGitLog] = useState(false);

  if (!gitLog) {
    const log = child.execSync(
      'git log --author=$(git config user.email) --format=%s%b --no-merges -n 10',
    );
    const logString = log ? log.toString() : ''; // if log is null, like when exiting git log, there's an error - so ternary will resolve this
    // TODO: need to get git log lines from whatever timeframe specified (default should be today, but since it's dev, just get the last 10),
    // then format them with dashes and neat lines (handle multiline commits somehow?), and output that to the user for confirmation.
    // Once confirmed, actually push it up to Harvest. Think about an option for a ticket heading?
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
