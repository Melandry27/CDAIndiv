import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
};

export function getDecodedToken(): DecodedToken | null {
  const token = localStorage.getItem("auth_token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    return decoded.exp * 1000 > Date.now() ? decoded : null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  const token = localStorage.getItem("auth_token");
  return token;
}
