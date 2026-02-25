// const API_URL = "http://localhost:3000/api/v1"
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1"
const API_URL = `${import.meta.env.VITE_API_URL}`;

export const getAdminProfile = async () => {
  const res = await fetch(`${API_URL}/auth/me`, {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  return { ok: res.ok, ...data };
};


export const adminLogout = async () => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include"
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const adminLogin = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  return {
    ok: res.ok,
    result
  };
};