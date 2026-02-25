const API_URL = "http://localhost:3000/api/v1";

export const getNotifi = async (limit) => {
    const res = await fetch(`${API_URL}/notifications?limit=${limit}`, {
        method: "GET",

        credentials: "include"
    });
    const result = await res.json();
    return {ok: res.ok, result}
}