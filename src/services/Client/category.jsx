// const API_URL = "http://localhost:3000/api/v1/client/categorys";
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/client/categorys";
const API_URL = `${import.meta.env.VITE_API_URL}/client/categorys`;


export const getCategory = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}