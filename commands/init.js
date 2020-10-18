import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import InitFields from '../components/InitFields';

/// init command
const init = () => {
	return (
		<Box flexDirection="column">
			<Text>
				Please enter your Harvest Personal Access Token and your Harvest Account ID here.
			</Text>
			<Text>
				Tokens and IDs can be found at
				<Text color="blue"> https://id.getharvest.com/oauth2/access_tokens/new</Text>.
			</Text>
			<InitFields />
		</Box>
	);
};

export default init;
