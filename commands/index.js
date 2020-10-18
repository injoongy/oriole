import React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'ink';

/// This is my command description
const HelloPerson = ({name}) => <Text>Hello, {name}</Text>;

HelloPerson.propTypes = {
	/// This is "name" option description
	name: PropTypes.string.isRequired
};

export default HelloPerson;