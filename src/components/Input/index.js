/* eslint-disable react/jsx-props-no-spreading */
import React, {forwardRef} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import propTypes from 'prop-types';

import {Container, TInput} from './styles';

const Input = forwardRef(({style, icon, ...rest}, ref) => (
  <Container style={style}>
    {icon && <Icon name={icon} size={20} color="rgba(255, 255, 255, 0.6)" />}
    <TInput {...rest} ref={ref} />
  </Container>
));

Input.propTypes = {
  icon: propTypes.string,
  style: propTypes.oneOfType([propTypes.object, propTypes.array]),
};

Input.defaultProps = {
  icon: null,
  style: {},
};

export default Input;
