import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const axiosUser = axios.create({
  baseURL: "https://connections-api.herokuapp.com/",
});

const token = {
  set(token) {
    axiosUser.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axiosUser.defaults.headers.common.Authorization = "";
  },
};

export const registerUser = createAsyncThunk(
  "users/signup",
  async (user, thunkAPI) => {
    try {
      const { data } = await axiosUser.post("users/signup", user);
      token.set(data.token);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.status);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    const persistToken = state.auth.token;
    if (!persistToken) {
      return thunkAPI.rejectWithValue("No token");
    }
    try {
      token.set(persistToken);
      const { data } = await axiosUser.get("users/current");
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/login",
  async (user, thunkAPI) => {
    try {
      const res = await axiosUser.post("/users/login", user);
      token.set(res.data.token);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await axiosUser.post("/users/logout");
    token.unset();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
import db from "../../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { authSlice } from "./authReducer";

const { authSignOut, authStateChange, updateUserProfile } = authSlice.actions;

const auth = getAuth(db);

export const authSignUpUser =
  ({ email, password, userName, photo }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;

      console.log(user);

      const { displayName, uid, photoURL } = await auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
        photoURL: photo,
      });

      const userUpdateProfile = {
        userId: uid,
        userName: userName,
        userEmail: email,
        photo: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      // console.log("user SignInUser", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authStateCahngeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const userUpdateProfile = {
          userName: user.displayName,
          userEmail: user.email,
          userId: user.uid,
          userEmail: user.email,
          photo: user.photoURL,
        };

        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    throw error;
  }
};

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut());
};
