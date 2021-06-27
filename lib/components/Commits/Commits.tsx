import React, { FC, useState } from 'react';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import * as child from 'child_process';
import { getData } from '../../utils/store';
import { pushHarvestEntry, getHarvestData } from '../../utils/harvest/harvest';
import { Error } from '../Error';
import {
  HarvestError,
  TimeEntryGetResponse,
} from '../../utils/harvest/harvest.interface';
import { Choice } from './Commits.interface';

export const Commits: FC = () => {
  const { exit } = useApp();
  const [gitLog, setGitLog] = useState('');
  const [showGitLog, setShowGitLog] = useState(false);
  const [error, setError] = useState<HarvestError>();
  const [success, setSuccess] = useState('');
  const choices: Choice[] = [
    { label: 'Yes', value: 'y' },
    { label: 'No', value: 'n' },
  ];
  const currentDir = process.cwd().split('/');
  const dirName = currentDir[currentDir.length - 1];

  const handleSelect = async (item: Choice) => {
    if (item.value === 'y') {
      const projectId = await getData(`${dirName}.projectId`);
      const taskId = await getData(`${dirName}.taskId`);
      // TODO: Allow user to add custom date as flag, --date yyyy-mm-dd?
      const spentDate = new Date().toLocaleDateString('en-CA'); // today as yyyy-mm-dd
      // TODO: Hours? Currently just hardcoded 3. Same question as above too - add as flag?
      const hours = 3;
      const body = {
        project_id: Number(projectId),
        task_id: Number(taskId),
        spent_date: spentDate,
        hours,
        notes: gitLog,
      };
      // Get all time entries for this date
      getHarvestData(
        `https://api.harvestapp.com/v2/time_entries?from=${spentDate}`,
      ).then((response) => {
        if (response.time_entries.length) {
          // See if any of the time entries are the same project and task
          const existingEntry = response.time_entries.find(
            (entry: TimeEntryGetResponse) =>
              entry.project.id === body.project_id &&
              entry.task.id === body.task_id,
          );
          // If they are the same project and task, simply update that entry rather than adding a new duplicate one
          if (existingEntry) {
            pushHarvestEntry(
              `https://api.harvestapp.com/v2/time_entries/${existingEntry.id}`,
              'PATCH',
              body,
            )
              .then(() => {
                setSuccess(
                  'Your existing time entry has been successfully updated.',
                );
                exit();
              })
              .catch((err) => {
                setError(JSON.parse(err.message));
                exit();
              });
          } else {
            // Otherwise, create a new entry and push it up
            pushHarvestEntry(
              'https://api.harvestapp.com/v2/time_entries',
              'POST',
              body,
            )
              .then(() => {
                setSuccess(
                  'Your commits have been successfully pushed up to Harvest.',
                );
                exit();
              })
              .catch((err) => {
                setError(JSON.parse(err.message));
                exit();
              });
          }
        }
      });
    } else {
      setSuccess('Your commits will not be pushed up.');
      exit();
    }
  };

  if (!gitLog) {
    const log = child.execSync(
      'git log --author=$(git config user.email) --format="- %B" --no-merges -n 10',
    );
    const logString = log ? log.toString() : ''; // if log is null, like when exiting git log, there's an error - so ternary will resolve this
    // TODO: Think about an option for a ticket heading?
    const formattedLog = logString.replace(/(^[ \t]*\n)/gm, '');
    setGitLog(formattedLog);
    setShowGitLog(true);
  }

  // TODO: Componentize everything to clean up ternary?
  return (
    <Box flexDirection='column'>
      {success ? (
        <Box marginBottom={1}>
          <Text>{success}</Text>
        </Box>
      ) : null}
      {error && error.status ? (
        <Box marginBottom={1}>
          <Error status={error.status} />
        </Box>
      ) : null}
      {!success && !error ? (
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
      ) : null}
    </Box>
  );
};
