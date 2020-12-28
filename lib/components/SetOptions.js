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
  const [savedProjectTaskInfo, setSavedProjectTaskInfo] = useState(false);

  const currentDir = process.cwd().split('/');
  const dirName = currentDir[currentDir.length - 1];

  // TODO: add logic to just set task or project using --project, --task, etc
  // TODO: add logic to get "summary" of current directory, outputting project and status
  // TODO: think about bad-path bugs - user forgets to set these before trying to save, etc.

  if (!rawUserProjects.length) {
    getHarvestData('https://api.harvestapp.com/v2/users/me/project_assignments').then(data => {
      setRawUserProjects(data.project_assignments);
      const formattedProjects = data.project_assignments.map(project => ({
        label: project.project.name,
        value: project.project.id,
      }));
      setUserProjects(formattedProjects);
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
  };

  const handleTaskSelect = selectedItem => {
    saveData(`${dirName}.taskId`, selectedItem.value);
    setSavedProjectTaskInfo(true);
    exit();
  };

  return (
    <Box flexDirection="column">
      {!userProjectTasks.length ? (
        <SelectInput items={userProjects} onSelect={handleProjectSelect} /> // TODO: add prompts
      ) : (
        <SelectInput items={userProjectTasks} onSelect={handleTaskSelect} /> // TODO: add prompts
      )}
      {savedProjectTaskInfo && (
        <Box marginTop={1}>
          /* TODO: add summary of what was just saved? And clean out prompt area so just this
          message appears. */
          <Text>Your project and task info has been saved successfully.</Text>
        </Box>
      )}
    </Box>
  );
};

export default SetOptions;
