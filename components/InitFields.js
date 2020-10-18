import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Box, useApp } from 'ink';
import TextInput from 'ink-text-input';

const InitFields = () => {
	const { exit } = useApp();
	const [token, setToken] = useState('');
	const [accountId, setAccountId] = useState('');
	const [showAccountField, setShowAccountField] = useState(false);

	const handleToken = value => setShowAccountField(true);
	const handleAccountId = value => {
		exit();
	}

	return (
		<Box flexDirection="column">
			<Box marginTop={1}>
				<Box marginRight={1}>
					<Text color="green">❯</Text>
				</Box>
				<TextInput
					placeholder="Enter your Harvest Personal Access Token here."
					focus={!showAccountField}
					value={token}
					onChange={setToken}
					onSubmit={handleToken}
				/>
			</Box>
			{showAccountField && (
				<Box>
					<Box marginRight={1}>
						<Text color="green">❯</Text>
					</Box>
					<TextInput
						placeholder="Enter your Harvest Account ID here."
						focus={showAccountField}
						value={accountId}
						onChange={setAccountId}
						onSubmit={handleAccountId}
					/>
				</Box>
			)}
		</Box>
	);
};

export default InitFields;
