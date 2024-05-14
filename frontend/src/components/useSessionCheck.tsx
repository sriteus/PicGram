// useGetUserData.jsx
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface UserData {
  validUser: boolean;
  username: string;
  email: string;
}

const useGetUserData = (): UserData | null => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);

  const checkSession = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:2200/userauth/");
      if (!res.data.validUser) {
        navigate("/login");
      } else {
        setUserData(res.data);
      }
    } catch (error) {
      console.error("Error checking session:", error);
    }
  }, [navigate]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return userData;
};

export default useGetUserData;
