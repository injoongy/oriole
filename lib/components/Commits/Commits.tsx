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
import { CommitsProps, Choice } from './Commits.interface';

export const Commits: FC<CommitsProps> = ({ hours }) => {
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

  const checkDirInit = async () => {
    const token = await getData('token');
    const accountId = await getData('accountId');
    const projectId = await getData(`${dirName}.projectId`);
    const taskId = await getData(`${dirName}.taskId`);

    if (!token || !accountId) {
      return 'No Harvest credentials found. Please run `oriole setup`, then `oriole init` in this directory, then try again.';
    }
    if (!projectId || !taskId) {
      return 'No Harvet project and/or task information found. Please run `oriole init` and try again.';
    }
    return true;
  };

  const handleSelect = async (item: Choice) => {
    if (item.value === 'y') {
      const projectId = await getData(`${dirName}.projectId`);
      const taskId = await getData(`${dirName}.taskId`);
      // TODO: Allow user to add custom date as flag, --date yyyy-mm-dd?
      const spentDate = new Date().toLocaleDateString('en-CA'); // today as yyyy-mm-dd
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
        // TODO: Simplify all of these pushHarvestEntry calls? Looks repetitive here.
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
        } else {
          // Otherwise, if there are no time entries for the day, same thing - create a new entry and push it up
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
      });
    } else {
      setSuccess('Your commits will not be pushed up.');
      exit();
    }
  };

  if (!gitLog && !success) {
    checkDirInit().then((res) => {
      if (res !== true) {
        setSuccess(res);
      } else {
        const log = child
          .execSync(
            'git log --author=$(git config user.email) --format="- %B" --no-merges --after="06:00" --before="18:00" --reverse', // modify this window? Have just after, not before?
          )
          .toString();

        // if there's no git log (aka no commits were made today between 6am and 6pm), show message and exit
        if (!log) {
          setSuccess(
            'No valid commits found.\nCommits need to have been made today between 6am and 6pm local time in order to be considered valid.\nMerge commits are not considered valid.\nThe ability to customize this time range window is on the roadmap, but not currently available.\nSorry for the inconvenience!',
          );
          // else, format the outputted git log and set it as the gitLog variable value
        } else {
          // TODO: Think about an option for a ticket heading?
          const formattedLog = log.replace(/(^[ \t]*\n)/gm, '');
          setGitLog(formattedLog);
          setShowGitLog(true);
        }
      }
    });
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
