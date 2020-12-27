import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import getHarvestData from '../utils/harvest';

const SetOptions = () => {
  const { exit } = useApp();
  const [userProjects, setUserProjects] = useState([]);
  const handleSelect = selectedItem => console.log(selectedItem);

  // TODO: add logic to check store and make sure there isn't already a selected project for the directory

  getHarvestData('https://api.harvestapp.com/v2/users/me/project_assignments').then(data => {
    const projects = data.project_assignments;
    const formattedProjects = projects.map(project => {
      return {
        label: project.project.name,
        value: project.project.id,
      };
    });

    setUserProjects(formattedProjects);
  });

  return (
    <Box flexDirection="column">
      <SelectInput items={userProjects} onSelect={handleSelect} />
    </Box>
  );
};

export default SetOptions;
