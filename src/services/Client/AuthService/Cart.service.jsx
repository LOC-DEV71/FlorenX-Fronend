// const API_URL = "http://localhost:3000/api/v1/carts";
const API_URL = `${import.meta.env.VITE_API_URL}/carts`;

export const getCart = async () => {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, result };
};

export const createCart = async () => {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, data: result.message };
};

export const addToCart = async (productId) => {
  const res = await fetch(`${API_URL}/add-to-cart?productId=${productId}`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, result };
};

export const addVoucher = async (voucher_id) => {
  const res = await fetch(`${API_URL}/add-voucher?voucher_id=${voucher_id}`, {
    method: "POST",
    credentials: "include",
  });
  const result = await res.json();
  return { ok: res.ok, result };
};

export const changeQuantity = async ({ productId, value }) => {
  const res = await fetch(
    `${API_URL}/change-quantity?product_id=${productId}&value=${value}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const result = await res.json();
  return { ok: res.ok, result };
};

export const deleteProductsInCart = async ( productId ) => {
  const res = await fetch(
    `${API_URL}/delete-product?product_id=${productId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const result = await res.json();
  return { ok: res.ok, result };
};
