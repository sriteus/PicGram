import axios from "axios";

export const checkSession = async () => {
  try {
    const res = await axios.get("http://localhost:2200/userauth/");
    if (!res.data.validUser) {
      return -1;
    } else {
      return res.data;
    }
  } catch (error) {
    console.error("Error checking session:", error);
  }
};
