const API_URL = "http://localhost:3000/api/v1/users";
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/users";
// const API_URL = `${import.meta.env.VITE_API_URL}/users`;


export const getMe = async () => {
  const res = await fetch(`${API_URL}/me`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const getMyAccount = async () => {
  const res = await fetch(`${API_URL}/my-account`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const login = async (data) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  const result = await res.json();
  return { ok: res.ok, data: result.message };
};


export const logout = async () => {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const register = async (data) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const update = async (data) => {
  const res = await fetch(`${API_URL}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const sendRegisterOtp = async (data) => {
  const res = await fetch(`${API_URL}/register/otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  const result = await res.json();
  console.log(result)
  return { ok: res.ok, data: result.message };
};


export const verifyRegisterOtp = async (data) => {
  const res = await fetch(`${API_URL}/register/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data)
  });
  const result = await res.json();
  return { ok: res.ok, data: result };
};


export const forgotPassword = async (data) => {
  const res = await fetch(`${API_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  const result = await res.json();
  return { ok: res.ok, data: result.message };
};


export const forgotPasswordOtp = async (data) => {
  const res = await fetch(`${API_URL}/forgot-password/otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  const result = await res.json();
  return { ok: res.ok, data: result.message };
};


export const resetPassword = async (data) => {
  const res = await fetch(`${API_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  const result = await res.json();
  console.log(result)
  return { ok: res.ok, data: result.message };
};
