import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    signed: false,
    loading: false,
    error: null,
    erroLogin: null,
  },
  reducers: {
    signInRequest: (state, action) => {
      state.payload = action.payload;
      state.loading = true;
    },
    signInSuccess(state, action) {
      state.token = action.payload.token;
      state.signed = true;
      state.loading = false;
      state.erroLogin = null;
      state.error = null;
      state.payload = null;
    },
    signUpRequest: (state, action) => {
      state.payload = action.payload;
      state.loading = true;
    },
    signUpSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.erroLogin = action.payload;
    },
    signUpFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    signOut(state) {
      state.token = null;
      state.signed = false;
      state.error = null;
      state.erroLogin = null;
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signUpRequest,
  signUpSuccess,
  signInFailure,
  signUpFailure,
  signOut,
} = authSlice.actions;

export default authSlice.reducer;
