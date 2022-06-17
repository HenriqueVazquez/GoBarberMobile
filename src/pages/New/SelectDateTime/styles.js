import styled from 'styled-components/native';
import colors from '~/styles/colors';
import {RectButton, GestureHandlerRootView} from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const HourList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  padding: 0 20px;
`;

export const Hour = styled(RectButton)`
  background: ${colors.light};
  border-radius: 4px;
  padding: 20px;
  margin: 0 10px 20px;
  flex: 1;
  opacity: ${props => (props.enabled ? 1 : 0.6)};

  align-items: center;
`;

export const HourText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.textListName};
`;

export const Click = styled(GestureHandlerRootView)`
  flex: 1;
`;
