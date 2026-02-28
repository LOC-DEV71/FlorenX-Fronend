// const API_URL = "http://localhost:3000/api/v1/client/products";
const API_URL = `${import.meta.env.VITE_API_URL}/client/products`;

export const getProductsInSlug = async (slug) => {
  const res = await fetch(`${API_URL}?slug=${slug}`, {
    method: "GET",
    credentials: "include"
  });

  const result = await res.json();
  return { ok: res.ok, result };
};

export const getProductsInSlugAll = async (slug) => {
  const res = await fetch(`${API_URL}/all?slug=${slug}`, {
    method: "GET",
    credentials: "include"
  });

  const result = await res.json();
  return { ok: res.ok, result };
};

export const getProductsInSlugSimilar = async (product_category_id) => {
  const res = await fetch(`${API_URL}/similar?product_category_id=${product_category_id}`, {
    method: "GET",
    credentials: "include"
  });

  const result = await res.json();
  return { ok: res.ok, result };
};

export const getProductDetail = async (slug) => {
  const res = await fetch(`${API_URL}/detail/${slug}`, {
    method: "GET",
    credentials: "include"
  });

  const result = await res.json();
  return { ok: res.ok, result };
};
