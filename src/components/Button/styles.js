import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import colors from '~/styles/colors';

export const Container = styled(RectButton)`
  height: 46px;
  background: #3b9eff;
  border-radius: 4px;

  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${colors.light};
  font-weight: bold;
  font-size: 16px;
`;
