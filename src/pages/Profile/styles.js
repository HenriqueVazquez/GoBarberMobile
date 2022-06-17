import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Separator = styled.View`
  height: 1px;
  background: ${colors.separator};
  margin: 20px 0 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.light};
  font-weight: bold;
  align-self: center;
  margin-top: 30px;
`;
export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 5px;
  margin-top: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 10px;
  background: ${colors.alert};
  margin-bottom: 30px;
`;

export const Error = styled.Text`
  font-size: 14px;
  font-weight: bold;
  text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.9);
  color: ${colors.alert};
  align-self: center;
`;
