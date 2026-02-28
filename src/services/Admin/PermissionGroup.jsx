const API_URL = "http://localhost:3000/api/v1/permission-group"
// const API_URL = `${import.meta.env.VITE_API_URL}/permission-group`;


export const getPermissionGroup = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include",
    })
    const result = await res.json();
    return {ok: res.ok, result}
}