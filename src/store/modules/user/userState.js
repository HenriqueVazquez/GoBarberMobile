import {createSlice} from '@reduxjs/toolkit';
import {signInSuccess, signOut} from '../auth/authState';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    error: null,
  },

  reducers: {
    updateProfileRequest(state) {
      state.error = null;
    },
    updateProfileSuccess(state, action) {
      state.profile = action.payload;
      state.error = null;
    },
    updateProfileFailure(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: {
    [signInSuccess]: (state, action) => {
      state.profile = action.payload.user;
    },
    [signOut]: state => {
      state.profile = null;
    },
  },
});

export const {
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} = userSlice.actions;

export default userSlice.reducer;
