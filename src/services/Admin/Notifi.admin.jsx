// const API_URL = "http://localhost:3000/api/v1";
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1";
const API_URL = `${import.meta.env.VITE_API_URL}`;

export const getNotifi = async (limit) => {
    const res = await fetch(`${API_URL}/notifications?limit=${limit}`, {
        method: "GET",

        credentials: "include"
    });
    const result = await res.json();
    return {ok: res.ok, result}
}