// services/addressService.js
import axios from "axios";
import { BASE_URL } from "../constant/appconstant";
import { getToken } from "./storage";

export const fetchAddresses = async () => {

  try {
    const token = await getToken();
    const response = await axios.get(`${BASE_URL}/profile/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return [];
  }

};
