const API_URL = "http://localhost:3000/api/v1/client/vouchers";

export const getVoucher = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}
