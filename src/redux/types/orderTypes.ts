export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAIL = "CREATE_ORDER_FAIL";

export const MY_ORDERS_REQUEST = "MY_ORDERS_REQUEST";
export const MY_ORDERS_SUCCESS = "MY_ORDERS_SUCCESS";
export const MY_ORDERS_FAIL = "MY_ORDERS_FAIL";

export const ALL_ORDERS_REQUEST = "ALL_ORDERS_REQUEST";
export const ALL_ORDERS_SUCCESS = "ALL_ORDERS_SUCCESS";
export const ALL_ORDERS_FAIL = "ALL_ORDERS_FAIL";

export const UPDATE_ORDER_REQUEST = "UPDATE_ORDER_REQUEST";
export const UPDATE_ORDER_SUCCESS = "UPDATE_ORDER_SUCCESS";
export const UPDATE_ORDER_RESET = "UPDATE_ORDER_RESET";
export const UPDATE_ORDER_FAIL = "UPDATE_ORDER_FAIL";

export const DELETE_ORDER_REQUEST = "DELETE_ORDER_REQUEST";
export const DELETE_ORDER_SUCCESS = "DELETE_ORDER_SUCCESS";
export const DELETE_ORDER_RESET = "DELETE_ORDER_RESET";
export const DELETE_ORDER_FAIL = "DELETE_ORDER_FAIL";

export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

export const CLEAR_ERRORS = "CLEAR_ERRORS";

export interface ShippingInfoTypes {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: number;
  phoneNo: number;
}

export interface PaymentInfoTypes {
  id: string;
  status: string;
}

export interface OrderItemsTypes {
  name: string;
  price: number;
  quantity: number;
  image: string;
  product: string;
}

export interface OrderTypes {
  shippingInfo: ShippingInfoTypes;
  orderItems: OrderItemsTypes[];
  user: string | any;
  _id: string;
  paymentInfo: PaymentInfoTypes;
  paidAt: Date;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt: Date;
  createdAt: Date;
}
