/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {ActivityIndicator} from 'react-native';
import propTypes from 'prop-types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Container, Text} from './styles';

function Button({children, loading, ...rest}) {
  return (
    <GestureHandlerRootView>
      <Container {...rest}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text>{children}</Text>
        )}
      </Container>
    </GestureHandlerRootView>
  );
}

Button.propTypes = {
  loading: propTypes.bool,
  children: propTypes.string.isRequired,
};

Button.defaultProps = {
  loading: false,
};

export default Button;
