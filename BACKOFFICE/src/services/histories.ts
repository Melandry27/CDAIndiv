import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/histories`;

export const getAllHistories = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createHistory = async (data: {
  registrationDate: string;
  comment: string;
  userId: string;
}) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateHistory = async (
  id: string,
  data: {
    registrationDate: string;
    comment: string;
    userId: string;
  }
) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteHistory = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
