const BASE_URL = "http://localhost:3000/api/favorites";
import axios from "axios";

export const getFavorites = async () => {
  const res = await axios.get(`${BASE_URL}`);
  return res.data;
};

export const getFavoriteById = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const getFavoritesByUserId = async (userId: string) => {
  const res = await axios.get(`${BASE_URL}/user/${userId}`);
  return res.data;
};

export const createFavorite = async (data: {
  userId: string;
  exerciseId: string;
}) => {
  const res = await axios.post(`${BASE_URL}`, data);
  return res.data;
};

export const updateFavorite = async (
  id: string,
  data: {
    userId: string;
    exerciseId: string;
  }
) => {
  const res = await axios.put(`${BASE_URL}/${id}`, data);
  return res.data;
};

export const deleteFavorite = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
