import {Platform} from 'react-native';
import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';
import colors from '~/styles/colors';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${colors.separator};
  margin: 20px 0 30px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: ${colors.light};
  font-weight: bold;
  font-size: 16px;
`;

export const Error = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.9);
  color: ${colors.alert};
  align-self: center;
  margin-bottom: 5px;
`;
