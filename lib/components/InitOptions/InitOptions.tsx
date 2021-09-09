import React, { useState, useEffect } from 'react';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import * as child from 'child_process';
import { getHarvestData } from '../../utils/harvest/harvest';
import { HarvestError } from '../../utils/harvest/harvest.interface';
import { saveData } from '../../utils/store';
import { Error } from '../Error';
import {
  Project,
  FormattedProject,
  FormattedTask,
  Selections,
} from './InitOptions.interface';

export const InitOptions = () => {
  const { exit } = useApp();
  const [rawUserProjects, setRawUserProjects] = useState<Project[]>([]);
  const [userProjects, setUserProjects] = useState<FormattedProject[]>([]);
  const [userProjectTasks, setUserProjectTasks] = useState<FormattedTask[]>([]);
  const [selections, setSelections] = useState<Selections>({});
  const [error, setError] = useState<HarvestError>();
  const [abortMessage, setAbortMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const currentDir = process.cwd().split('/');
  const dirName = currentDir[currentDir.length - 1];

  // TODO: add logic to just set task or project using --project, --task, etc
  // TODO: is there some way we can cache everything to prevent too many network requests?

  useEffect(() => {
    // check to see if current dir is a valid git repo
    child.exec('[ -d .git ] && echo .git || git rev-parse --git-dir > /dev/null 2>&1', (execError) => {
      if (execError) {
        // if not, set abort message
        setAbortMessage('This directory doesn\'t appear to be a Git repository.\nPlease navigate to a directory that is a Git repository and try again.');
      }
      // else, proceed with running GET request
      else if (!rawUserProjects.length && !error) {
        getHarvestData('https://api.harvestapp.com/v2/users/me/project_assignments')
          .then((data) => {
            setRawUserProjects(data.project_assignments);
            const formattedProjects = data.project_assignments.map(
              (project: Project) => ({
                label: project.project.name,
                value: project.project.id,
              }),
            );
            setUserProjects(formattedProjects);
            setLoading(false);
          })
          .catch((err) => {
            setError(JSON.parse(err.message));
            exit();
          });
      }
    });
  }, []);


  const handleProjectSelect = (selectedItem: FormattedProject) => {
    saveData(`${dirName}.projectId`, selectedItem.value);
    const selectedProject = rawUserProjects.find(
      (project) => project.project.id === selectedItem.value,
    );
    if (selectedProject) {
      const formattedProjectTasks = selectedProject.task_assignments.map(
        (task) => ({
          label: task.task.name,
          value: task.task.id,
        }),
      );
      setUserProjectTasks(formattedProjectTasks);
      setSelections({ projectName: selectedItem.label });
    }
  };

  const handleTaskSelect = (selectedItem: FormattedTask) => {
    saveData(`${dirName}.taskId`, selectedItem.value);
    setSelections({ ...selections, taskName: selectedItem.label });
    exit();
  };

  // TODO: think about refactoring this series of ternaries
  // Easiest way would be to componentize everything
  return (
    <Box flexDirection='column'>
      {error && error.status ? (
        <Error status={error.status} />
      ) : null}
      {abortMessage ? (
        <Text color='red'>{abortMessage}</Text>
      ) : null}
      {!userProjectTasks.length && !error && !abortMessage ? (
        <Box flexDirection='column'>
          {loading ? (
            <Text>
              <Text color='blue'>
                <Spinner type='clock' />
              </Text>
              {' Loading...'}
            </Text>
          ) : (
            <Box flexDirection='column'>
              <Text>Please select a project to associate with this directory.</Text>
              <Box marginTop={1}>
                <SelectInput
                  items={userProjects}
                  limit={20}
                  onSelect={handleProjectSelect}
                />
              </Box>
              {userProjects.length > 20 && (
                <Box marginLeft={2}>
                  <Text color='green'>(Scroll for more)</Text>
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : null}
      {userProjectTasks.length && !selections.taskName && !error && !abortMessage ? (
        <Box flexDirection='column'>
          <Text>Please select a project task.</Text>
          <Box marginTop={1}>
            <SelectInput
              items={userProjectTasks}
              limit={10}
              onSelect={handleTaskSelect}
            />
          </Box>
          {userProjectTasks.length > 10 && (
            <Box marginLeft={2}>
              <Text color='green'>(Scroll for more)</Text>
            </Box>
          )}
        </Box>
      ) : null}
      {userProjectTasks.length && selections.taskName && !error && !abortMessage ? (
        <Box flexDirection='column' marginTop={1} marginBottom={1}>
          <Text>
            Your project and task choices have been saved successfully.
          </Text>
          <Text>
            This directory &quot;{dirName}&quot; has now been associated with the following:
          </Text>
          <Box flexDirection='column' marginTop={1} marginBottom={1}>
            <Text>
              Harvest Project: <Text color='blue' bold>{selections.projectName}</Text>
            </Text>
            <Text>
              Harvest Task: <Text color='blue' bold>{selections.taskName}</Text>
            </Text>
          </Box>
          <Text>
            You may change these at any time by re-running the &quot;oriole init&quot;
            command.
          </Text>
        </Box>
      ) : null}
    </Box>
  );
};
