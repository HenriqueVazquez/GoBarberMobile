/* eslint-disable default-param-last */
import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  error: null,
  erroLogin: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }

      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        draft.erroLogin = null;
        break;
      }
      case '@auth/SIGN_UP_SUCCESS': {
        draft.error = null;
        break;
      }

      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        draft.erroLogin = action.payload.erroLogin;

        break;
      }

      case '@auth/SIGN_UP_FAILURE': {
        draft.loading = false;
        draft.error = action.payload.erroMensage;

        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        draft.error = null;
        draft.erroLogin = null;
        break;
      }

      default:
    }
  });
}
