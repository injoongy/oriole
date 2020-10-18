import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { render, useInput, useApp, Text, Box } from 'ink';

/// init command
const init = () => {
	const { exit } = useApp();
	const [x, setX] = useState(1);
	const [y, setY] = useState(1);

	useInput((input, key) => {
		if (input === 'q') {
			exit();
		}

		if (key.leftArrow) {
			setX(Math.max(1, x - 1));
		}

		if (key.rightArrow) {
			setX(Math.min(20, x + 1));
		}

		if (key.upArrow) {
			setY(Math.max(1, y - 1));
		}

		if (key.downArrow) {
			setY(Math.min(10, y + 1));
		}
	});

	return (
		<Box flexDirection="column">
			<Text>Please enter your Harvest Personal Access Token and your Harvest Account ID here.</Text>
			<Text>Tokens and IDs can be found here: https://id.getharvest.com/oauth2/access_tokens/new</Text>
			<Box height={12} paddingLeft={x} paddingTop={y}>
				<Text>^_^</Text>
			</Box>
		</Box>
	);
};

export default init;
