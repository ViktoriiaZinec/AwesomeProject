import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: { name: null },
  isLoggedIn: false,
};

console.log("initialState", initialState);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});
console.log("authSlice", authSlice);
export const { setUser, clearUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
