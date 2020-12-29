import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import getHarvestData from '../utils/harvest';
import { saveData } from '../utils/store';

const SetOptions = () => {
  const { exit } = useApp();
  const [rawUserProjects, setRawUserProjects] = useState([]);
  const [userProjects, setUserProjects] = useState([]);
  const [userProjectTasks, setUserProjectTasks] = useState([]);
  const [selections, setSelections] = useState({});
  const [requestError, setRequestError] = useState(false);

  const currentDir = process.cwd().split('/');
  const dirName = currentDir[currentDir.length - 1];

  // TODO: add logic to just set task or project using --project, --task, etc
  // TODO: think about bad-path bugs - user forgets to set these before trying to save, etc.
  // TODO: is there some way we can cache everything to prevent too many network requests?

  if (!rawUserProjects.length && !requestError) {
    getHarvestData('https://api.harvestapp.com/v2/users/me/project_assignments')
      .then(data => {
        setRawUserProjects(data.project_assignments);
        const formattedProjects = data.project_assignments.map(project => ({
          label: project.project.name,
          value: project.project.id,
        }));
        setUserProjects(formattedProjects);
      })
      .catch(error => {
        setRequestError(error.message);
        exit();
      });
  }

  const handleProjectSelect = selectedItem => {
    saveData(`${dirName}.projectId`, selectedItem.value);
    const selectedProject = rawUserProjects.find(
      project => project.project.id === selectedItem.value,
    );
    const formattedProjectTasks = selectedProject.task_assignments.map(task => ({
      label: task.task.name,
      value: task.task.id,
    }));
    setUserProjectTasks(formattedProjectTasks);
    setSelections({ projectName: selectedItem.label });
  };

  const handleTaskSelect = selectedItem => {
    saveData(`${dirName}.taskId`, selectedItem.value);
    setSelections({ ...selections, taskName: selectedItem.label });
    exit();
  };

  return (
    <Box flexDirection="column">
      {requestError && (
        <Box flexDirection="column" marginTop={1}>
          <Text>
            There's been an error with the request.
            <Text color="red"> ({requestError})</Text>
          </Text>
          <Text>
            Please verify that you entered the correct credentials for your Harvest account by
            re-running the "oriole init" command, or try again later.
          </Text>
        </Box>
      )}
      {!userProjectTasks.length ? (
        <Box flexDirection="column">
          <Text>Please select a project to associate with this directory.</Text>
          <Box marginTop={1}>
            <SelectInput items={userProjects} limit={10} onSelect={handleProjectSelect} />
          </Box>
          {userProjects.length > 10 && (
            <Box marginLeft={2}>
              <Text color="green">(Scroll for more)</Text>
            </Box>
          )}
        </Box>
      ) : userProjectTasks.length && !selections.taskName ? (
        <Box flexDirection="column">
          <Text>Please select a project task.</Text>
          <Box marginTop={1}>
            <SelectInput items={userProjectTasks} limit={10} onSelect={handleTaskSelect} />
          </Box>
          {userProjectTasks.length > 10 && (
            <Box marginLeft={2}>
              <Text color="green">(Scroll for more)</Text>
            </Box>
          )}
        </Box>
      ) : (
        <Box flexDirection="column" marginTop={1}>
          <Text>Your project and task choices have been saved successfully.</Text>
          <Text>
            This directory "{dirName}" has now been associated with the project "
            {selections.projectName}" and the task "{selections.taskName}".
          </Text>
          <Text>You may change these at any time by re-running the "oriole set" command.</Text>
        </Box>
      )}
    </Box>
  );
};

export default SetOptions;
