const API_URL = "http://localhost:3000/api/v1"

export const createProducts = async data => {
    const res = await fetch(`${API_URL}/products/create`, {
        method: "POST",
        body: data
    });
    const result = await res.json();
    return { ok: res.ok, data: result }
}

export const changeMulti = async (data) => {
  const res = await fetch(`${API_URL}/products/change-multi`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

    const result = await res.json();
    return { ok: res.ok, data: result }
};


export const getProducts = async (data) => {
    const params = new URLSearchParams();

    if (data.page) params.append("page", data.page);
    if (data.limit) params.append("limit", data.limit);
    if (data.sort) params.append("sort", data.sort);
    if (data.search) params.append("search", data.search);

    const res = await fetch(
        `${API_URL}/products?${params.toString()}`,
        { method: "GET" }
    );

    const result = await res.json();
    return { ok: res.ok, data: result };
};

export const getDetailProducts = async (data) => {
    const res = await fetch(
        `${API_URL}/products/detail/${data}`,
        { method: "GET" }
    );

    const result = await res.json();
    return result;
};

export const updateProducts = async (slug, data) => {
    const res = await fetch(`${API_URL}/products/update/${slug}`, {
        method: "PATCH",
        body: data
    });
    const result = await res.json();
    return { ok: res.ok, ...result };
};

