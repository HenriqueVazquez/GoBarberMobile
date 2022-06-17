/* eslint-disable react/jsx-no-bind */
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';
// import {useFocusEffect} from '@react-navigation/native';

import api from '~/services/api';
// import SystemNavigationBar from 'react-native-system-navigation-bar';

import Background from '~/components/Background';
import Appointment from '~/components/Appointment';

import {
  Container,
  ContainerHeader,
  ContainerButtonPageLeft,
  ContainerButtonPageRight,
  Title,
  List,
} from './styles';

export default function Dashboard() {
  /* useFocusEffect(() => {
    SystemNavigationBar.setNavigationColor(colors.secundary, true);
  }); */

  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [canceledAppointment, setCanceledAppointment] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadAppointments() {
      const response = await api.get('appointments', {
        params: {
          page,
        },
      });

      if (response.data.length === 0) {
        setPage(page - 1);
        setNextPage(false);
      }

      setAppointments(response.data);
    }

    if (isFocused) {
      loadAppointments();
    }

    if (canceledAppointment) {
      loadAppointments();
      setCanceledAppointment(false);
    }

    loadAppointments();
  }, [page, isFocused, canceledAppointment]);

  async function handleCancel(id) {
    const response = await api.delete(`appointments/${id}`);
    setCanceledAppointment(true);

    setAppointments(
      appointments.map(appointment =>
        appointment.id === id
          ? {
              ...appointment,
              canceled_at: response.data.canceled_at,
            }
          : appointment,
      ),
    );
  }

  function handleNewPage() {
    if (appointments.length >= 1) {
      return setPage(page + 1);
    }
    return page;
  }

  function handlePreviousPage() {
    if (page > 1) {
      setNextPage(true);
      return setPage(page - 1);
    }
    return page;
  }

  return (
    <Background>
      <Container>
        <ContainerHeader>
          {page > 1 ? (
            <ContainerButtonPageLeft>
              <GestureHandlerRootView>
                <TouchableOpacity onPress={handlePreviousPage}>
                  <Icon name="arrow-left" size={35} color={colors.light} />
                </TouchableOpacity>
              </GestureHandlerRootView>
            </ContainerButtonPageLeft>
          ) : (
            <ContainerButtonPageLeft />
          )}

          <Title>Agendamentos</Title>

          {nextPage ? (
            <ContainerButtonPageRight>
              <GestureHandlerRootView>
                <TouchableOpacity onPress={handleNewPage}>
                  <Icon name="arrow-right" size={35} color={colors.light} />
                </TouchableOpacity>
              </GestureHandlerRootView>
            </ContainerButtonPageRight>
          ) : (
            <ContainerButtonPageRight />
          )}
        </ContainerHeader>
        <List
          data={appointments}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <Appointment onCancel={() => handleCancel(item.id)} data={item} />
          )}
        />
      </Container>
    </Background>
  );
}
