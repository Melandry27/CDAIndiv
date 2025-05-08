import axios from "axios";

const BASE_URL = "http://localhost:3000/api/exercises";

export const getAllBreathingExercises = async () => {
  const res = await axios.get(BASE_URL);

  console.log(res.data);

  return res.data;
};

export const createBreathingExercise = async (data: any) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateBreathingExercise = async (id: string, data: any) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteBreathingExercise = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
