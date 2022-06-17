import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ContainerButtonPageLeft = styled.View`
  margin-top: 13px;
  margin-left: 40px;
  width: 30px;
`;

export const ContainerButtonPageRight = styled.View`
  margin-top: 13px;
  margin-right: 40px;
  width: 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.light};
  font-weight: bold;
  margin-top: 15px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {padding: 30},
})``;
