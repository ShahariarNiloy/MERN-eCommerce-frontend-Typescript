import { BASE_URL } from "../../config";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../types/cartTypes";
import axios from "axios";

// Add to Cart
export const addItemsToCart =
  (id: any, quantity: any): any =>
  async (
    dispatch: (arg0: {
      type: string;
      payload: {
        product: any;
        name: any;
        price: any;
        image: any;
        stock: any;
        quantity: any;
      };
    }) => void,
    getState: () => {
      (): any;
      new (): any;
      cart: { (): any; new (): any; cartItems: any };
    }
  ) => {
    const { data } = await axios.get(`${BASE_URL}/api/v1/product/${id}`);

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// REMOVE FROM CART
export const removeItemsFromCart =
  (id: any): any =>
  async (
    dispatch: (arg0: { type: string; payload: any }) => void,
    getState: () => {
      (): any;
      new (): any;
      cart: { (): any; new (): any; cartItems: any };
    }
  ) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

// SAVE SHIPPING INFO
export const saveShippingInfo =
  (data: any): any =>
  async (dispatch: (arg0: { type: string; payload: any }) => void) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };
