const API_URL = "http://localhost:3000/api/v1/chats";
// const API_URL = "https://nodejs-production-a6f1.up.railway.app/api/v1/chats";
// const API_URL = `${import.meta.env.VITE_API_URL}/chats`;


export const getRoom = async (data) => {
    const res = await fetch(`${API_URL}/get-room`, {
        method: "GET",
        credentials: "include",
    })

    const result = await res.json();
    return {ok: res.ok, result}
}

export const getListRoom = async (data) => {
    const res = await fetch(`${API_URL}/list-room`, {
        method: "GET",
        credentials: "include",
    })

    const result = await res.json();
    return {ok: res.ok, result}
}
export const postMessage = async (data) => {
    const res = await fetch(`${API_URL}/send-message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    })

    return {ok: res.ok}
}
export const getMessages = async (roomId) => {
    const res = await fetch(`${API_URL}/list-message?roomId=${roomId}`, {
        method: "GET",
        credentials: "include",
    })

    const result = await res.json();
    return {ok: res.ok, result}
}