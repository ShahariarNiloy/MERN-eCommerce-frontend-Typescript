import { BASE_URL } from "../../config";
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../types/userTypes";
import axios from "axios";

// Login
export const login =
  (email: any, password: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: LOGIN_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/login`,
        { email, password },
        config
      );

      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };

// Register
export const register =
  (userData: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/register`,
        userData,
        config
      );

      dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Load User
export const loadUser =
  (): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: LOAD_USER_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/api/v1/me`);

      dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
  };

// Logout User
export const logout =
  (): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      await axios.get(`${BASE_URL}/api/v1/logout`);

      dispatch({ type: LOGOUT_SUCCESS });
    } catch (error: any) {
      dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
  };

// Update Profile
export const updateProfile =
  (userData: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: UPDATE_PROFILE_REQUEST });

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      const { data } = await axios.put(
        `${BASE_URL}/api/v1/me/update`,
        userData,
        config
      );

      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update Password
export const updatePassword =
  (passwords: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: UPDATE_PASSWORD_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `${BASE_URL}/api/v1/password/update`,
        passwords,
        config
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error: any) {
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Forgot Password
export const forgotPassword =
  (email: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: FORGOT_PASSWORD_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/password/forgot`,
        email,
        config
      );

      dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (error: any) {
      dispatch({
        type: FORGOT_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Reset Password
export const resetPassword =
  (token: any, passwords: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: RESET_PASSWORD_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `${BASE_URL}/api/v1/password/reset/${token}`,
        passwords,
        config
      );

      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
    } catch (error: any) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get All Users
export const getAllUsers = (): any => async (dispatch: any) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });
    const { data } = await axios.get(`${BASE_URL}/api/v1/admin/users`);

    dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
  } catch (error: any) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
  }
};

// get  User Details
export const getUserDetails =
  (id: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: USER_DETAILS_REQUEST });
      const { data } = await axios.get(`${BASE_URL}/api/v1/admin/user/${id}`);

      dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error: any) {
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Update User
export const updateUser =
  (id: any, userData: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(
        `${BASE_URL}/api/v1/admin/user/${id}`,
        userData,
        config
      );

      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete User
export const deleteUser =
  (id: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });

      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/admin/user/${id}`
      );

      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors =
  (): any => async (dispatch: (arg0: { type: string }) => void) => {
    dispatch({ type: CLEAR_ERRORS });
  };
