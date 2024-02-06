'use client'
import { FC } from "react";
import axios from "axios";

const Home: FC = () => {
  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:4000",
  });

  const onLogin = async () => {
    try {
      const response = await axiosInstance.post("/login", {});
      console.log("Login successful", response.data);
    } catch (error: any) {
      console.error("Login error", error.response);
    }
  };

  const getUser = async () => {
    try {
      const response = await axiosInstance.get("/user/profile");
      console.log("User data", response.data);
    } catch (error: any) {
      console.error("Error fetching user data", error.response);
    }
  };

  return (
    <div>
      <button type="button" onClick={() => onLogin()}>
        Login
      </button><br/>
      <button type="button" onClick={() => getUser()}>
        Get user
      </button>
    </div>
  );
};

export default Home;
