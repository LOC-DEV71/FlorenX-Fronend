const API_URL = "http://localhost:3000/api/v1/client/vouchers";
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/client/vouchers";
// const API_URL = `${import.meta.env.VITE_API_URL}/client/vouchers`;


export const getVoucher = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}
