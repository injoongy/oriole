import React from 'react';
import { Text, Box } from 'ink';

const Error = ({ status }) => {
  return (
    <Box flexDirection="column" marginTop={1}>
      <Text>
        There's been an error with the request.
        <Text color="red"> ({status})</Text>
      </Text>
      {status === 401 ? (
        <Text>
          Please verify that you entered the correct credentials for your Harvest account by
          re-running the "oriole init" command, or try again later.
        </Text>
      ) : (
        <Text>This error hasn't been properly handled yet.</Text>
      )}
    </Box>
  );
};

export default Error;
