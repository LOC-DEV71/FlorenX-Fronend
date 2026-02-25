const API_URL = "http://localhost:3000/api/v1/chats";

export const getMessagesAdmin = async (roomId) => {
    const res = await fetch(`${API_URL}/list-message-admin?roomId=${roomId}`, {
        method: "GET",
        credentials: "include",
    })

    const result = await res.json();
    return {ok: res.ok, result}
}