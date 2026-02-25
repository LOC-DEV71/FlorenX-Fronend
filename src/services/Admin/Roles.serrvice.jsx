// const API_URL = "http://localhost:3000/api/v1/roles";
const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/roles";

export const createRoles = async data => {
    const res = await fetch(`${API_URL}/create`, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return {ok: res.ok, result}
}
export const updateRoles = async data => {
    const res = await fetch(`${API_URL}/update`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })
    const result = await res.json();
    return {ok: res.ok, result}
}
export const getRoles = async (query) => {
    const params = new URLSearchParams();
    if(query.page) params.append("page", query.page)
    if(query.limit) params.append("limit", query.limit)
    const res = await fetch(`${API_URL}?${params.toString()}`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}
export const getListRoles = async () => {
    const res = await fetch(`${API_URL}/get`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}

export const getRolesPermission = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}