// const API_URL = "http://localhost:3000/api/v1/permission-group"
const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/permission-group"

export const getPermissionGroup = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}