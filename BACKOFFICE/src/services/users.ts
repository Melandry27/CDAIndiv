import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const getAllUsers = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(API_URL, data);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: { name: string; email: string }
) => {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
};
