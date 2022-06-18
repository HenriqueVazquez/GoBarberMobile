export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {email, password},
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: {token, user},
  };
}

export function signUpRequest(name, email, password, confirmPassword) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {name, email, password, confirmPassword},
  };
}

export function signInFailure(erroLogin) {
  return {
    type: '@auth/SIGN_IN_FAILURE',
    payload: {erroLogin},
  };
}

export function signUpFailure(erroMensage) {
  return {
    type: '@auth/SIGN_UP_FAILURE',
    payload: {erroMensage},
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
