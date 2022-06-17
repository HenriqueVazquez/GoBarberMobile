/* eslint-disable react/prefer-stateless-function */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';

import './config/ReactotronConfig';

import colors from './styles/colors';

import {store, persistor} from './store';
import Routes from './routes';

export default class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}
