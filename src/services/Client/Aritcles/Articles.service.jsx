// const API_URL = "http://localhost:3000/api/v1/client/articles";
const API_URL = `${import.meta.env.VITE_API_URL}/client/articles`;

export const getList = async (category) => {
  const res = await fetch(`${API_URL}/get-list?category=${category}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, result: result };
};
export const getByLocation = async (data) => {
  const params = new URLSearchParams();
  if (data.category) params.append("category", data.category)
  if (data.limit) params.append("limit", data.limit)
  if (data.skip) params.append("skip", data.skip)
  const res = await fetch(`${API_URL}/by-location?${params.toString()}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, result: result };
};


export const getAllArticles = async (data) => {
  const params = new URLSearchParams();
  if (data.category) params.append("category", data.category)
  if (data.limit) params.append("limit", data.limit)
  if (data.skip) params.append("skip", data.skip)
  const res = await fetch(`${API_URL}/get-all?${params.toString()}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, result: result };
};

export const getDetailArticles = async (slug) => {
  const res = await fetch(`${API_URL}/detail?slug=${slug}`, {
    method: "GET",
    credentials: "include",
  })
  const result = await res.json();
  return { ok: res.ok, result }
}