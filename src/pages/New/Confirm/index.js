/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
import React, {useMemo} from 'react';
import {formatRelative, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Background from '~/components/Background';
import api from '~/services/api';

import {Container, Avatar, Name, Time, SubmitButton} from './styles';

export default function Confirm({navigation, route}) {
  const provider = route.params?.provider;
  const time = route.params?.time;

  const dateFormatted = useMemo(
    () => formatRelative(parseISO(time), new Date(), {locale: pt}),
    [time],
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.navigate('Dashboard');
  }

  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `https://robohash.org/${provider.name}?set=set3&size=120x120`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>
        <SubmitButton onPress={handleAddAppointment}>
          Confirmar agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}
