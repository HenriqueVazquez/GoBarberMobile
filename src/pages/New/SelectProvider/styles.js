import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import colors from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
`;

export const ProviderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  numColumns: 2,
})`
  margin-top: 60px;
  padding: 0 20px;
`;

export const Provider = styled(RectButton)`
  background: ${colors.light};
  border-radius: 4px;
  padding: 20px;
  flex: 1;

  align-items: center;
  margin: 0 10px 20px;
`;

export const ProviderAvatar = styled.Image`
  width: 75px;
  height: 75px;
  border-radius: 37.5px;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.textListName};
  text-align: center;
`;
