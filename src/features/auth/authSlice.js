import { createSlice } from '@reduxjs/toolkit';
import { clearNotes } from '../notes/notesSlice';

const initialState = {
  isAuth: localStorage.getItem('accessToken') ? true : false,
  accessToken: localStorage.getItem('accessToken') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuth = true;
      state.accessToken = '123';
      localStorage.setItem('accessToken', '123');
    },
    logout: (state, action) => {
      state.isAuth = false;
      state.accessToken = null;
      localStorage.removeItem('accessToken');
      if (action.payload?.clearNotes) {
        action.payload.dispatch(clearNotes());
      }
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;