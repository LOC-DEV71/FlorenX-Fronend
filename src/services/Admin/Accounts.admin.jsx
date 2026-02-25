// const API_URL = "http://localhost:3000/api/v1/accounts"
const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1accounts"
export const createAccounts = async data => {
    const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        credentials: "include",
        body: data
    })
    const result = await res.json();
    return {ok: res.ok, result};
}
export const changeMultiAccounts = async data => {
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
export const getAccounts = async query => {
    const params = new URLSearchParams();
    if (query.page) params.append("page", query.page);
    if (query.limit) params.append("limit", query.limit);
    const res = await fetch(`${API_URL}?${params.toString()}`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result};
}

