import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import * as child from 'child_process';
import { Choice } from './Commits.interface';

export const Commits: FC = () => {
  const { exit } = useApp();
  const [gitLog, setGitLog] = useState('');
  const [showGitLog, setShowGitLog] = useState(false);
  const choices: Choice[] = [
    { label: 'Yes', value: 'y' },
    { label: 'No', value: 'n' },
  ];
  const handleSelect = (item: Choice) => {
    if (item.value === 'y') {
      console.log('confirmed');
      exit();
    } else {
      console.log('rejected');
      exit();
    }
  };

  if (!gitLog) {
    const log = child.execSync(
      'git log --author=$(git config user.email) --format="- %B" --no-merges -n 10',
    );
    const logString = log ? log.toString() : ''; // if log is null, like when exiting git log, there's an error - so ternary will resolve this
    // TODO: need to get git log lines from whatever timeframe specified (default should be today, but since it's dev, just get the last 10),
    // then format them with dashes and neat lines (handle multiline commits somehow?), and output that to the user for confirmation.
    // Once confirmed, actually push it up to Harvest. Think about an option for a ticket heading?
    const formattedLog = logString.replace(/(^[ \t]*\n)/gm, '');
    setGitLog(formattedLog);
    setShowGitLog(true);
  }

  return (
    <Box flexDirection='column'>
      <Text>Here are your latest commits in this repo:</Text>
      {showGitLog && (
        <Box marginTop={1} flexDirection='column'>
          <Text>{gitLog}</Text>
          <Box flexDirection='column'>
            <Text>Push these up to Harvest?</Text>
            <SelectInput items={choices} onSelect={handleSelect} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
