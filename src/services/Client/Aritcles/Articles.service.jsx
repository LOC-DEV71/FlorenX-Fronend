const API_URL = "http://localhost:3000/api/v1/client/articles";

export const getList = async () => {
  const res = await fetch(`${API_URL}/get-list`, {
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
  return {ok: res.ok, result}
}