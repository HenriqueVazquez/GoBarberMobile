import {Alert} from 'react-native';
import {takeLatest, all, put, call} from 'redux-saga/effects';
import * as RootNavigation from '~/path/to/RootNavigation';

import api from '~/services/api';
import {
  signInSuccess,
  signUpFailure,
  signInFailure,
} from '~/store/modules/auth/actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const {token, user} = response.data;

    if (user.provider) {
      Alert.alert(
        'Usuário não é um prestador de serviço',
        'faça o login pelo aplicativo do celular!',
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    const erroLogin = err.response.data ? err.response.data : '';
    Alert.alert('Falha na autenticação', 'verifique seus dados!');
    yield put(signInFailure(erroLogin));
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password, confirmPassword} = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      confirmPassword,
    });

    RootNavigation.navigate('SignIn');
  } catch (err) {
    const erroMensage = err.response.data ? err.response.data : '';

    /* if (typeof erroMensage.Erro !== 'string') {
      for (let i = 0; i < erroMensage.Erro.length; i++) {
        Alert.alert('Falha na atualização do perfil', erroMensage.Erro[i]);
        console.tron.log(erroMensage.Erro[i]);
      }
    } else if (typeof erroMensage.Erro === 'string') {
      const message = JSON.stringify(Object.values(erroMensage).join(''));
      Alert.alert(
        'Falha na atualização do perfil',
        message.substring(1, message.length - 1),
      );
    } */
    Alert.alert('Falha na autenticação', 'verifique seus dados!');
    yield put(signUpFailure(erroMensage));
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
