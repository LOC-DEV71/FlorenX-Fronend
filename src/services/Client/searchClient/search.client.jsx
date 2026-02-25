const API_URL = "http://localhost:3000/api/v1/client/search";

export const searchClient = async (search) => {
  const res = await fetch(`${API_URL}?search=${search}`, {
    method: "GET",
    credentials: "include"
  });

  const result = await res.json();
  return { ok: res.ok, result };
};
