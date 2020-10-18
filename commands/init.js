import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import TextInput from 'ink-text-input';

/// init command
const init = () => {
	const [token, setToken] = useState('');

	return (
		<Box flexDirection="column">
			<Text>Please enter your Harvest Personal Access Token and your Harvest Account ID here.</Text>
			<Text>Tokens and IDs can be found here: https://id.getharvest.com/oauth2/access_tokens/new</Text>
			<Box>
				<Box marginRight={1}>
					<Text>Enter your Harvest Personal Access Token:</Text>
				</Box>
				<TextInput value={token} onChange={setToken} />
			</Box>
		</Box>
	);
};

export default init;
