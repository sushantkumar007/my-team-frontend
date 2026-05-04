import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },
    removeUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
