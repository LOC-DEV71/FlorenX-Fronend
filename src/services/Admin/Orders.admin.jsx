// const API_URL = "http://localhost:3000/api/v1/orders";
const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/orders";
// const API_URL = `${import.meta.env.VITE_API_URL}/orders`;


export const getOrders = async (data) => {
    const params = new URLSearchParams();
    if (data.page) params.append("page", data.page);
    if (data.limit) params.append("limit", data.limit);
    if (data.sort) params.append("sort", data.sort);
    const res = await fetch(`${API_URL}?${params.toString()}`, {
        method: "GET",
        credentials: "include"
    })

    const result = await res.json();
    return { ok: res.ok, result }
}

export const getOrderDetail = async (general) => {
    const res = await fetch(`${API_URL}/detail/${general}`, {
        method: "GET",
        credentials: "include"
    })

    const result = await res.json();
    return { ok: res.ok, result }
}

export const changeOrders = async (data) => {
    const res = await fetch(`${API_URL}/change-multi`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return {ok: res.ok, result}
}
export const changeStatus = async (type, general) => {
    const res = await fetch(`${API_URL}/change-status?type=${type}&general=${general}`, {
        method: "PATCH",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}