import axios from "../utils/axios";

export const getMessages = async (chatId) => {
  const res = await axios.get(`/api/v1/messages/${chatId}`);
  return res.data;
};

export const saveMessage = async ({ chat_id, role, content }) => {
  const res = await axios.post("/api/v1/messages", { chat_id, role, content });
  return res.data;
};
