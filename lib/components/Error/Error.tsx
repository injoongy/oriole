import React, { FC } from 'react';
import { Text, Box } from 'ink';
import { ErrorProps } from './Error.interface';

export const Error: FC<ErrorProps> = ({ status }) => (
  <Box flexDirection='column' marginTop={1}>
    <Text>
      There&apos;s been an error with the request.
      <Text color='red'> ({status})</Text>
    </Text>
    {status === 401 ? (
      <Text>
        Please verify that you entered the correct credentials for your Harvest
        account by re-running the &lsquo;oriole setup&rsquo; command, or try
        again later.
      </Text>
    ) : (
      <Text>This error hasn&apos;t been properly handled yet.</Text>
    )}
  </Box>
);
