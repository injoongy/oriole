import React, { FC } from 'react';
import { Text } from 'ink';
import { version } from '../package.json';

// TODO: Add chalk output to this to make it look cool, also update command description, and see if you can fix the duplicate command trick
// Currently, if you run oriole --help, the `oriole` command gets listed twice - the second one has the description. What I think this means
// is that because oriole is itself a command (since we have an index.tsx), it's displaying the help menu for the CLI app, then displaying
// the help menu for the oriole command itself. Hence, the double output. Or something like that. Fix? Maybe get rid of index command altogether?

/// Command to display the version.
const oriole: FC = () => <Text>ORIOLE v{version}</Text>;

export default oriole;
