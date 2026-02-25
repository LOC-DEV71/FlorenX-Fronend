const API_URL = "http://localhost:3000/api/v1/client/order";

export const order = async (data) => {
    const res = await fetch(`${API_URL}/checkout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    const result = await res.json();
    return {ok: res.ok, result}
}

export const getOrders = async () => {
    const res = await fetch(`${API_URL}`, {
        method: "GET",
        credentials: "include"
    })
    const result = await res.json();
    return {ok: res.ok, result}
}

