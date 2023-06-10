import { BASE_URL } from "../../config";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../types/orderTypes";

import axios from "axios";

// Create Order
export const createOrder =
  (order: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: CREATE_ORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/order/new`,
        order,
        config
      );

      dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: CREATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// My Orders
export const myOrders =
  (): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/api/v1/orders/me`);

      dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error: any) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get All Orders (admin)
export const getAllOrders = (): any => async (dispatch: any) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/v1/admin/orders`);

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error: any) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order
export const updateOrder =
  (id: any, order: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/admin/order/${id}`,
        order,
        config
      );

      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success });
    } catch (error: any) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Delete Order
export const deleteOrder =
  (id: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: DELETE_ORDER_REQUEST });

      const { data } = await axios.delete(
        `${BASE_URL}/api/v1/admin/order/${id}`
      );

      dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
    } catch (error: any) {
      dispatch({
        type: DELETE_ORDER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Get Order Details
export const getOrderDetails =
  (id: any): any =>
  async (dispatch: (arg0: { type: string; payload?: any }) => void) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { data } = await axios.get(`${BASE_URL}/api/v1/order/${id}`);

      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });
    } catch (error: any) {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors =
  (): any => async (dispatch: (arg0: { type: string }) => void) => {
    dispatch({ type: CLEAR_ERRORS });
  };
