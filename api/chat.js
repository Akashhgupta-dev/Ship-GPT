import { chatApi } from "./config";
import { serverConstant } from "./server-constant";

export const chatControllers = {
  askAI: async ({ query, shipId, companyId, type, model }) => {
    try {
      const res = await chatApi.post(serverConstant.retrivalUrls.chat, {
        query,
        shipId,
        companyId,
        type,
        model,
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  getChatHistory: async (type) => {
    try {
      const res = await chatApi.get(
        `${serverConstant.retrivalUrls.conversations}?type=${type}`,
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
  getConversationById: async (id) => {
    try {
      const res = await chatApi.get(
        `${serverConstant.retrivalUrls.conversations}/${id}`,
      );
      return res;
    } catch (error) {
      throw error;
    }
  },
};
