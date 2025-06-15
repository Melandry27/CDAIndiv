import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/sessions`;

export const getAllSessions = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const createSession = async (data: {
  sessionDateTime: string;
  performedDuration: number;
  userId: string;
  exerciseId: string;
}) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateSession = async (
  id: string,
  data: {
    sessionDateTime: string;
    performedDuration: number;
    userId: string;
    exerciseId: string;
  }
) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteSession = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
