import axios from "../utils/axios";

export const getChats = async () => {
  const res = await axios.get("/api/v1/chats");
  return res.data;
};

export const createChat = async (title, folderId = null) => {
  const res = await axios.post("/api/v1/chats", { title, folder_id: folderId });
  return res.data;
};

export const updateChat = async (id, title) => {
  const res = await axios.put(`/api/v1/chats/${id}`, { title });
  return res.data;
};

export const deleteChat = async (id) => {
  const res = await axios.delete(`/api/v1/chats/${id}`);
  return res.data;
};
