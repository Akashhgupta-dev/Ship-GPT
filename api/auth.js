import { publicApi, secureApi } from "./config";
export const authControllers = {
  login: async (data) => {
    try {
      let result = await publicApi.post("/login", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  getUserById: async (id, role) => {
    try {
      let result = await secureApi.get(`/users/${id}`, {
        params: { user_role: role },
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data) => {
    try {
      let result = await secureApi.post("/change-password", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  forgotPassword: async (data) => {
    try {
      let result = await publicApi.post("/forgot-password", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
  resetPassword: async (data) => {
    try {
      let result = await publicApi.post("/reset-password", data);
      return result;
    } catch (error) {
      throw error;
    }
  },
};
