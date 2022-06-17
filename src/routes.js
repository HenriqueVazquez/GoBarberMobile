/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import {navigationRef} from '~/path/to/RootNavigation';
import New from './pages/New';

import colors from './styles/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer ref={navigationRef}>
      {signed ? (
        <Tab.Navigator
          initialRouteName="Dashboard"
          screenOptions={({route}) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            animation: 'none',
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Dashboard') {
                iconName = focused ? 'today' : 'today-outline';
              }
              if (route.name === 'Agendar') {
                iconName = focused ? 'add-circle' : 'add-circle-outline';
              }
              if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              return <Icon name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: colors.light,
            tabBarInactiveTintColor: colors.inative,

            tabBarStyle: {
              backgroundColor: colors.secundary,
              height: 60,
              paddingBottom: 10,
              paddingTop: 10,
              borderTopWidth: 0,
              justifyContent: 'center',
              alignItems: 'center',
            },
          })}>
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen
            name="Agendar"
            initialParams={{screen: 'Provider'}}
            component={New}
            options={{
              tabBarStyle: {
                display: 'none',
              },
            }}
          />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            animation: 'none',
          }}>
          <Stack.Group>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{
                title: '',
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: colors.primary,
                },

                headerTintColor: colors.light,
              }}
            />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
