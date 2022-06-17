/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';

import Background from '~/components/Background';
import DateInput from '~/components/DateInput';

import api from '~/services/api';

import {Container, HourList, Hour, HourText, Click} from './styles';

export default function SelectDateTime({route, navigation}) {
  const [date, setDate] = useState(new Date());
  const [hours, setHours] = useState([]);

  const provider = route.params?.provider;

  useEffect(() => {
    async function loadAvailable() {
      const response = await api.get(`providers/${provider.id}/available`, {
        params: {
          date: date.getTime(),
        },
      });

      setHours(response.data);
    }

    loadAvailable();
  }, [date, provider.id]);

  function handleSelectHour(time) {
    navigation.navigate('Confirm', {
      provider,
      time,
    });
  }

  return (
    <Background>
      <Container>
        <DateInput date={date} onChange={setDate} />

        <HourList
          data={hours}
          keyExtractor={item => item.time}
          renderItem={({item}) => (
            <Click>
              <Hour
                enabled={item.avaiable}
                onPress={() => handleSelectHour(item.value)}>
                <HourText>{item.time}</HourText>
              </Hour>
            </Click>
          )}
        />
      </Container>
    </Background>
  );
}
