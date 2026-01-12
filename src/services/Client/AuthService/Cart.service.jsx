const API_URL = "http://localhost:3000/api/v1/carts";
export const createCart = async () => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, data: result.message };
};