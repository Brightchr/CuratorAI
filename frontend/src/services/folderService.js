import axios from "../utils/axios";

export const getFolders = async () => {
  const res = await axios.get("/api/v1/folders");
  return res.data;
};

export const createFolder = async (name) => {
  const res = await axios.post("/api/v1/folders", { name });
  return res.data;
};
