import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/categories`;

export type Category = {
  id: string;
  name: string;
  icon: string;
};

export const getAllCategories = async (): Promise<Category[]> => {
  const res = await axios.get(BASE_URL);

  if (!res.data) {
    throw new Error("Failed to load categories");
  }

  return res.data as Category[];
};

export const createCategory = async (data: { name: string; icon: string }) => {
  const res = await axios.post(BASE_URL, data);
  return res.data;
};

export const updateCategory = async (
  id: string,
  data: { name: string; icon: string }
) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
