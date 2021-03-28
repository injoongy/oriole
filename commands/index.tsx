import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'ink';
import { IndexProps } from '../lib/utils/commandTypes.interface';

/// Hello world command
const Hello: FC<IndexProps> = ({ name }) => <Text>Hello, {name}</Text>;

Hello.propTypes = {
  /// Name of the person to greet
  name: PropTypes.string.isRequired,
};

export default Hello;
