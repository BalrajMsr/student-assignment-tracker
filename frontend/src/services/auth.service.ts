import { API } from "./api";
import { type AuthResponse } from "@/types";

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => API.post("api/v1/auth/register", data);

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  const response = await API.post("api/v1/auth/login", data);
  return response?.data?.data;
};
