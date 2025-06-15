import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/exercises`;

export const getAllBreathingExercises = async () => {
  const res = await axios.get(BASE_URL);

  return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createBreathingExercise = async (data: any) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateBreathingExercise = async (id: string, data: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteBreathingExercise = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
