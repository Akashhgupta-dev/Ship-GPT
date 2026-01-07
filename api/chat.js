import { chatApi } from "./config";
export const chatControllers = {
  askAI: async (data) => {
    try {
      const res = await chatApi.post("/retrival/chat", data);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
