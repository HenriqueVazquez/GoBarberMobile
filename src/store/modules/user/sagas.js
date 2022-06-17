/* eslint-disable no-plusplus */
/* eslint-disable prefer-object-spread */
/* eslint-disable camelcase */
import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '~/services/api';

import {updateProfileSuccess, updateProfileFailure} from './actions';

export function* updateProfile({payload}) {
  try {
    const {name, email, ...rest} = payload.data;

    const profile = Object.assign(
      {
        name,
        email,
      },
      rest.oldPassword ? rest : {},
    );

    const response = yield call(api.put, 'users', profile);

    Alert.alert('Perfil atualizado', 'Com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    const erroMensage = err.response.data;

    yield put(updateProfileFailure(erroMensage));
    /* const erroMensage = err.response.data;

    if (typeof erroMensage.Erro !== 'string') {
      for (let i = 0; i < erroMensage.Erro.length; i++) {
        Alert.alert('Falha na atualização do perfil', erroMensage.Erro[i]);
      }
    } else if (typeof erroMensage.Erro === 'string') {
      const message = JSON.stringify(Object.values(erroMensage).join('.'));
      Alert.alert(
        'Falha na atualização do perfil',
        message.substring(1, message.length - 1),
      );
    }

    yield put(updateProfileFailure(erroMensage)); */
  }
}

export default all([
  takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile),
  // takeLatest('@user/UPDATE_PROFILE_FAILURE', updateProfile),
]);
