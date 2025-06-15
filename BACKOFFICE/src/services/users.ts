import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

export const getAllUsers = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateUser = async (
  id: string,
  data: { name: string; email: string }
) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
