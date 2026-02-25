const API_URL = "http://localhost:3000/api/v1/client/categorys";

export const getCategory = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}