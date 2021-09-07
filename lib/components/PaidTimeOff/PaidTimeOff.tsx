import React, { FC, useState, useEffect } from 'react';
import { Text, Box, useApp } from 'ink';
import Spinner from 'ink-spinner';
import { Error } from '../Error';
import { getHarvestData } from '../../utils/harvest/harvest';
import {
  HarvestError,
} from '../../utils/harvest/harvest.interface';
import { Project } from '../InitOptions/InitOptions.interface';
import { PaidTimeOffProps, Task, TimeEntry } from './PaidTimeOff.interface';

export const PaidTimeOff: FC<PaidTimeOffProps> = ({ year }) => {
  const { exit } = useApp();
  const [error, setError] = useState<HarvestError>();
  const [hours, setHours] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const currentYearDateStart = `${year || new Date().getFullYear()}-01-01`;
  const currentYearDateEnd = year && `${year}-12-31`;

  useEffect(() => {
    if (!hours && !message && !error) {
      if (year !== undefined && (Number.isNaN(year) || !Number.isInteger(year))) {
        setLoading(false);
        setMessage('Please enter a valid year.');
      } else {
        getHarvestData('https://api.harvestapp.com/v2/users/me/project_assignments')
          .then((data) => {
            const tivixInternalProject = data.project_assignments.find((project: Project) => project.project.name === 'Tivix Internal / Side Projects');
            const tivixPtoTask = tivixInternalProject.task_assignments.find((task: Task) => task.task.name === 'PTO');
            const tivixPtoTaskId = tivixPtoTask.task.id;
  
            const getUrl = currentYearDateEnd
              ? `https://api.harvestapp.com/v2/time_entries?task_id=${tivixPtoTaskId}&from=${currentYearDateStart}&to=${currentYearDateEnd}`
              : `https://api.harvestapp.com/v2/time_entries?task_id=${tivixPtoTaskId}&from=${currentYearDateStart}`;
  
            getHarvestData(getUrl)
              .then((entryData) => {
                const totalHours = entryData.time_entries.reduce((previous: number, current: TimeEntry) => previous + current.hours, 0);
                setLoading(false);
                if (!totalHours) {
                  setMessage('No PTO hours found for the specified year.');
                } else {
                  setHours(totalHours);
                }
              })
              .catch((err) => {
                setLoading(false);
                setError(err.message);
                exit();
              });
          })
          .catch((err) => {
            setLoading(false);
            setError(err.message);
            exit();
          });
      }
    }
  }, []); // this entire command only needs to ever run once every time it's invoked

  return (
    <Box flexDirection='column'>
      {error && error.status ? (
        <Box marginBottom={1}>
          <Error status={error.status} />
        </Box>
      ) : null}
      {loading ? (
        <Text>
          <Text color='blue'>
            <Spinner type='weather' />
          </Text>
          {' Calculating...'}
        </Text>
      ) : null}
      {message ? (
        <Box marginBottom={1}>
          <Text>
            {message}
          </Text>
        </Box>
      ) : null}
      {hours ? (
        <Box marginBottom={1}>
          <Text>Your total PTO hours spent in {year || new Date().getFullYear()} are:
            <Text color='blue'> {hours}</Text>
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};
