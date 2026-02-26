// const API_URL = "http://localhost:3000/api/v1/vouchers";
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/vouchers";
const API_URL = `${import.meta.env.VITE_API_URL}/vouchers`;


export const getListVouchers = async (query) => {
    const params = new URLSearchParams();

    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    if (query.limit) params.append("sort", query.sort);
    const res = await fetch(`${API_URL}/get?${params.toString()}`, {
        method: "get",
        credentials: "include",
    })

    const result = await res.json();
    return {ok: res.ok, result}
}
export const getOneVoucher = async (id) => {
    const res = await fetch(`${API_URL}/detail/${id}`, {
        method: "get",
        credentials: "include",
    })

    const result = await res.json();
    return {ok: res.ok, result}
}
export const createVoucher = async data => {
    const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    const result = await res.json();
    return {ok: res.ok, result}
}
export const updateVoucher = async data => {
    const res = await fetch(`${API_URL}/update/${data.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data.data)
    })

    const result = await res.json();
    return {ok: res.ok, result}
}
export const changeMultiVouchers = async data => {
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