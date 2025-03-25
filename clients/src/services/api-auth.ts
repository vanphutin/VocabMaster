import { ApiResponse } from "../types/ApiResponse";
import { User } from "../types/User";
import axios from "../utils/axiosConfig";

const END_POINT = "auth";

export const register = async (payload: User) => {
  const response = await axios.post<ApiResponse<{ user: User }>>(
    `${END_POINT}/register`,
    payload
  );
  return response;
};
