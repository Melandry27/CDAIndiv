import { API_URL } from "@/config";
import axios from "axios";

const BASE_URL = `${API_URL}/exercises`;

export type BreathingExercise = {
  id: string;
  name: string;
  description: string;
  duration: number;
  level: string;
  categories?: {
    id: string;
    name: string;
    icon: string;
  }[];
};

export const getAllBreathingExercises = async (): Promise<
  BreathingExercise[]
> => {
  const res = await axios.get(BASE_URL);

  if (!res.data || !Array.isArray(res.data)) {
    throw new Error("Failed to load exercises");
  }

  return res.data as BreathingExercise[];
};

export const getBreathingExerciseById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const createBreathingExercise = async (data: {
  name: string;
  description: string;
  duration: number;
  level: string;
  categoryIds: string[];
}) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateBreathingExercise = async (
  id: string,
  data: {
    name: string;
    description: string;
    duration: number;
    level: string;
    categoryIds: string[];
  }
) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteBreathingExercise = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
