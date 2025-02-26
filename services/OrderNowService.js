import axios from "axios";
import { BASE_URL } from "../constant/appconstant";
import { getToken } from "./storage";

export const placeOrder = async (orderDetails) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/checkout/order-now`,
      orderDetails,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/order/verify-payment`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-API-Key": "rzp_test_cWfbuLENrweRjB",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
