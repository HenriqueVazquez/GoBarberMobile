/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  TouchableOpacity,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import colors from '~/styles/colors';
// import SystemNavigationBar from 'react-native-system-navigation-bar';
import PropTypes from 'prop-types';
import SelectProvider from './SelectProvider';
import SelectDateTime from './SelectDateTime';
import Confirm from './Confirm';

const ScheduleStack = createNativeStackNavigator();

export default function ScheduleStackScreen() {
  // SystemNavigationBar.setNavigationColor(colors.primary, true);
  return (
    <ScheduleStack.Navigator
      screenOptions={({navigation}) => ({
        headerTintColor: colors.light,
        animation: 'none',
        borderBottomColor: colors.light,
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerLeft: () => (
          <GestureHandlerRootView>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Icon name="arrow-back" size={24} color={colors.light} />
            </TouchableOpacity>
          </GestureHandlerRootView>
        ),
        headerStyle: {
          backgroundColor: colors.primary,
        },
      })}>
      <ScheduleStack.Screen
        name="Provider"
        component={SelectProvider}
        options={{
          title: 'Selecione o Profissional',
        }}
      />
      <ScheduleStack.Screen
        name="Date"
        component={SelectDateTime}
        options={{
          title: 'Selecione a Data e Hora',
        }}
      />
      <ScheduleStack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          title: 'Confirmar Agendamento',
        }}
      />
    </ScheduleStack.Navigator>
  );
}

ScheduleStackScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
